<?php
session_start();
require 'db.php'; // Подключение к базе данных

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$temple_id = isset($_GET['id']) ? intval($_GET['id']) : 0; // Получаем ID храма из GET-запроса

try {
    
    $query = "
        SELECT COUNT(*) AS user_voted
        FROM voting
        WHERE id_temple = :temple_id AND id_user = :user_id
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':temple_id', $temple_id, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'data' => [$result]]);
} catch (PDOException $e) {
    error_log("Ошибка выполнения запроса: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Ошибка выполнения запроса.']);
}
?>
