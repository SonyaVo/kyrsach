<?php
require 'db.php'; // Подключение к базе данных

// Проверяем наличие параметра id
if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'ID не указан.']);
    exit;
}

$id = intval($_GET['id']); // Приводим к целому числу

// Подготовка SQL-запроса для поиска по ID
$stmt = $pdo->prepare("SELECT * FROM lost_tempels WHERE id = :id");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();

// Получаем результат запроса
$result = $stmt->fetch(PDO::FETCH_ASSOC);

// Если запись найдена, выводим данные
if ($result) {
    echo json_encode(['success' => true, 'data' => $result]);
} else {
    echo json_encode(['success' => false, 'message' => 'Запись с таким ID не найдена.']);
}