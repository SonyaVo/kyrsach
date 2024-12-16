<?php
session_start(); // Начало сессии

// Подключение к базе данных
require 'db.php'; // Включаем файл подключения

try {
    // Подготовка вызова хранимой процедуры
    $stmt = $pdo->prepare("CALL GetTemplesWithVoteCount()");
    $stmt->execute();
    
    // Получение данных
    $temples = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Возвращаем данные в формате JSON
    header('Content-Type: application/json');
    echo json_encode($temples);
} catch (PDOException $e) {
    // Возвращаем ошибку в формате JSON
    header('Content-Type: application/json', true, 500); // Устанавливаем код ответа 500
    echo json_encode(['error' => 'Ошибка выполнения запроса: ' . $e->getMessage()]);
}
?>
