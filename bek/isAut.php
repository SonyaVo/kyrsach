<?php
session_start(); // Начинаем сессию

// Регенерируем идентификатор сессии для безопасности
session_regenerate_id(true);

// Проверяем, авторизован ли пользователь
$isAuthenticated = isset($_SESSION['user_id']); // Предположим, что user_id хранится в сессии

// Устанавливаем заголовки для предотвращения кэширования
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate'); // HTTP 1.1
header('Pragma: no-cache'); // HTTP 1.0
header('Expires: 0'); // Proxies

// Возвращаем информацию о авторизации в формате JSON
echo json_encode(['isAuthenticated' => $isAuthenticated]);
?>
