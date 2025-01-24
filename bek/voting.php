<?php
session_start();
include 'db.php'; 

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Пользователь не авторизован.']);
    exit;
}

if (!isset($_POST['id_temple']) || !filter_var($_POST['id_temple'], FILTER_VALIDATE_INT)) {
    echo json_encode(['success' => false, 'message' => 'ID храма не передан или некорректен.']);
    exit;
}

$id_temple = intval($_POST['id_temple']); 
$id_user = $_SESSION['user_id']; 

try {
    $sql = "SELECT COUNT(*) AS voteCount FROM voting WHERE id_user = :id_user AND id_temple = :id_temple";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_user', $id_user, PDO::PARAM_INT);
    $stmt->bindParam(':id_temple', $id_temple, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $voteCount = $result['voteCount'];

    if ($voteCount > 0) {
        echo json_encode(['success' => false, 'message' => 'Вы уже проголосовали за этот храм.']);
        exit;
    }

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
    error_log("Ошибка базы данных: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Ошибка базы данных. Пожалуйста, попробуйте позже.']);
}
?>











