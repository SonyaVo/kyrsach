<?php
session_start(); // Начинаем сессию

// Проверяем, авторизован ли пользователь
$isAuthenticated = isset($_SESSION['user_id']); // Предположим, что user_id хранится в сессии

// Возвращаем информацию о авторизации в формате JSON
echo json_encode(['isAuthenticated' => $isAuthenticated]);
?>