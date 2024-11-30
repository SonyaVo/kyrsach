<?php
session_start(); // Начало сессии
require 'db.php';

// Устанавливаем заголовки для JSON-ответа
header('Content-Type: application/json; charset=utf-8');

// Проверяем, авторизован ли пользователь
if (isset($_SESSION['user_id'])) {
    $userId = (int)$_SESSION['user_id'];

    // Выполняем запрос к базе данных
    $stmt = $pdo->prepare('SELECT * FROM users WHERE id = :id');
    $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
    $stmt->execute();

    $user = $stmt->fetch();

    // Возвращаем данные пользователя или сообщение об ошибке
    if ($user) {
        echo json_encode(['success' => true, 'data' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User is not authenticated']);
}
