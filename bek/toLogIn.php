<?php
session_start();
require 'db.php'; 
$loginMessage = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Валидация и фильтрация входных данных
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $password = trim($_POST['password']);

    // Проверка на наличие обязательных полей
    if (empty($phone) || empty($password)) {
        $loginMessage = "Телефон и пароль обязательны.";
    } else {
        // Проверка на статический логин (для админа)
        if ($phone === '89999999999' && $password === 'admin') {
            $_SESSION['user_id'] = 'admin';
            $_SESSION['phone'] = $phone;

            header("Location: admin_main.php");
            exit();
        }

        // Подготовленный запрос для поиска пользователя
        $query = $pdo->prepare("SELECT * FROM users WHERE phone = ?");
        $query->execute([$phone]);
        $user = $query->fetch();

        // Проверка пароля
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['phone'] = $user['phone'];

            header("Location: main.php");
            exit();
        } else {
            $loginMessage = "Неправильный телефон или пароль";
        }
    }
}
?>
