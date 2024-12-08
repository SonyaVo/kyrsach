<?php
session_start(); // Начало сессии

// Подключение к базе данных
require 'db.php'; // Включаем файл подключения

// Получение данных о храмах и количестве голосов
$sql = "SELECT lt.id, lt.название, COUNT(v.id) AS vote_count 
        FROM lost_tempels lt 
        LEFT JOIN voting v ON lt.id = v.id_temple 
        GROUP BY lt.id";

try {
    $stmt = $pdo->query($sql);
    $temples = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Возвращаем данные в формате JSON
    header('Content-Type: application/json');
    echo json_encode($temples);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Ошибка выполнения запроса: ' . $e->getMessage()]);
}
?>