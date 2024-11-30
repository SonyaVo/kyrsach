<?php
require 'db.php';

$signMessage = "";
// Обработка данных формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $surname = trim($_POST['surname']);
    $name = trim($_POST['name']);
    $patronymic = trim($_POST['patronymic']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];



    // Хеширование пароля
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Проверка и добавление пользователя
    try {
        $stmt = $pdo->prepare("INSERT INTO users (surname,name,patronymic,phone,email,password) 
        VALUES (:surname,:name,:patronymic,:phone,:email, :password)");
        $stmt->execute([
            ':surname' => $surname,
            ':name' => $name,
            ':patronymic' => $patronymic,
            ':phone' => $phone,
            ':email' => $email,
            ':password' => $hashed_password
        ]);
        $signMessage = "Регистрация прошла успешно!";
        
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Ошибка уникальности (дублирование)
            $signMessage = "Пользователь с таким телефоном или email уже существует.";
        } else {
            $signMessage = "Ошибка базы данных: " . $e->getMessage();
        }
    }
}
?>