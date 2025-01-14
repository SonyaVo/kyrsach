<?php
require 'db.php';

$response = [
    'success' => false,
    'message' => ''
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $surname = filter_var(trim($_POST['surname']), FILTER_SANITIZE_STRING);
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $patronymic = filter_var(trim($_POST['patronymic']), FILTER_SANITIZE_STRING);
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
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
        $response['success'] = true;
        $response['message'] = "Регистрация прошла успешно!";
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            $response['message'] = "Пользователь с таким телефоном или email уже существует.";
        } else {
            error_log($e->getMessage());
            $response['message'] = "Ошибка базы данных. Пожалуйста, попробуйте позже.";
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
