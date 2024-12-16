<?php
session_start(); // Начало сессии
require 'db.php';

// Устанавливаем заголовки для JSON-ответа
header('Content-Type: application/json; charset=utf-8');

// Проверяем, авторизован ли пользователь
if (isset($_SESSION['user_id'])) {
    $userId = (int)$_SESSION['user_id']; // Приводим к целому числу для безопасности

    // Выполняем запрос к базе данных
    try {
        $stmt = $pdo->prepare('SELECT id, surname, name, patronymic, email FROM users WHERE id = :id');
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC); // Получаем данные как ассоциативный массив

        // Возвращаем данные пользователя или сообщение об ошибке
        if ($user) {
            // Убираем чувствительные данные перед отправкой
            unset($user['password']); // Убедитесь, что вы не отправляете пароль
            echo json_encode(['success' => true, 'data' => $user]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        // Логируем ошибку и возвращаем сообщение
        error_log("Database error: " . $e->getMessage());
        echo json_encode(['success' => false, 'message' => 'Internal server error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User is not authenticated']);
}
?>
