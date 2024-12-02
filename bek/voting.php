<?php
session_start();
include 'db.php'; // Подключение к базе данных

// Включаем отображение ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Устанавливаем заголовок для JSON
header('Content-Type: application/json');

// Проверяем, авторизован ли пользователь
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Пользователь не авторизован.']);
    exit;
}

// Проверяем, передан ли ID храма
if (!isset($_POST['id_temple'])) {
    echo json_encode(['success' => false, 'message' => 'ID храма не передан.']);
    exit;
}

// Получаем данные из запроса
$id_temple = intval($_POST['id_temple']); // ID храма, который передается из JavaScript
$id_user = $_SESSION['user_id']; // ID пользователя из сессии

try {
    // Проверка на существование записи о голосовании
    $checkSql = "SELECT COUNT(*) FROM voting WHERE id_user = :id_user AND id_temple = :id_temple";
    $checkStmt = $pdo->prepare($checkSql);
    $checkStmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $checkStmt->bindParam(':id_temple', $id_temple, PDO::PARAM_INT);
    $checkStmt->execute();
    
    $count = $checkStmt->fetchColumn();

    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => 'Вы уже проголосовали за этот храм.']);
        exit;
    }

    // Подготовка SQL запроса для вставки голоса
    $sql = "INSERT INTO voting (id_user, id_temple) VALUES (:id_user, :id_temple)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $stmt->bindParam(':id_temple', $id_temple, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Голос успешно записан.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при записи голоса.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Ошибка базы данных: ' . $e->getMessage()]);
}
?>
