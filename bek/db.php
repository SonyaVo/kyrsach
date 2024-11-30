<?php
// Настройки подключения
$host = 'localhost'; 
$db_name = 'lost_temple'; 
$db_user = 'lost_temple'; 
$db_password = 'Stud249013!'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения к базе данных: " . $e->getMessage());
}
