<?php
require 'db.php';

$signMessage = "";

// Обработка данных формы
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Валидация и фильтрация входных данных
    $surname = filter_var(trim($_POST['surname']), FILTER_SANITIZE_STRING);
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $patronymic = filter_var(trim($_POST['patronymic']), FILTER_SANITIZE_STRING);
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    // Проверка на пустые поля
    if (empty($surname) || empty($name) || empty($phone) || empty($email) || empty($password)) {
        $signMessage = "Все поля обязательны для заполнения.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $signMessage = "Некорректный адрес электронной почты.";
    } else {
        // Хеширование пароля
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Проверка и добавление пользователя
        try {
            $stmt = $pdo->prepare("INSERT INTO users (surname, name, patronymic, phone, email, password) 
            VALUES (:surname, :name, :patronymic, :phone, :email, :password)");
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
                // Логируем ошибку на сервере
                error_log($e->getMessage());
                $signMessage = "Ошибка базы данных. Пожалуйста, попробуйте позже.";
            }
        }
    }
}
?>
