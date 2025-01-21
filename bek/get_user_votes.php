<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Пользователь не зарегестрирован.']);
    exit;
}

$user_id = $_SESSION['user_id'];

try {

    $stmt = $pdo->prepare("CALL GetUserVotedTemples(:user_id)");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $churches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'data' => $churches]);
} catch (PDOException $e) {
    error_log("Ошибка выполнения запроса: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Ошибка выполнения запроса.']);
}
?>