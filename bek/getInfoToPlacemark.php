<?php
// Подключаем файл с настройками базы данных
require 'db.php'; // Убедитесь, что путь к файлу правильный




// Запрос к базе данных
$sql = "SELECT * FROM lost_tempels"; // Замените на имя вашей таблицы
$stmt = $pdo->prepare($sql);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Возвращаем данные в формате JSON
echo json_encode($data);
?>