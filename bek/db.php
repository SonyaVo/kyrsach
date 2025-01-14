<?php

$host = getenv('DB_HOST') ?: 'localhost'; 
$db_name = getenv('DB_NAME') ?: 'lost_temple'; 
$db_user = getenv('DB_USER') ?: 'lost_temple'; 
$db_password = getenv('DB_PASSWORD') ?: 'lost_temple'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {

    error_log("Ошибка подключения к базе данных: " . $e->getMessage());
    die("Ошибка подключения к базе данных.");
}