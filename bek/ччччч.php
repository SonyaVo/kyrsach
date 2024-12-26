<?php
// Подключение к базе данных с использованием переменных окружения
$host = getenv('DB_HOST') ?: 'localhost'; 
$db_name = getenv('DB_NAME') ?: 'lost_temple'; 
$db_user = getenv('DB_USER') ?: 'lost_temple'; 
$db_password = getenv('DB_PASSWORD') ?: 'Stud249013!'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Логирование ошибки вместо вывода на экран
    error_log("Ошибка подключения к базе данных: " . $e->getMessage());
    die("Ошибка подключения к базе данных.");
}

// Получение данных из таблицы map
$sql = "SELECT id, x, y, w, h FROM map";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$rectangles = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>