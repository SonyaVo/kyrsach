<?php
session_start(); 
require 'db.php';

header('Content-Type: application/json; charset=utf-8');
if (isset($_SESSION['user_id'])) {
    $userId = (int)$_SESSION['user_id'];

    try {
        $stmt = $pdo->prepare('CALL GetUserById(:id)');
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            unset($user['password']); 
            echo json_encode(['success' => true, 'data' => $user]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Internal server error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User is not authenticated']);
}
?>
