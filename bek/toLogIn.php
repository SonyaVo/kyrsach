<?php
session_start();
require 'db.php';

$response = [
    'success' => false,
    'message' => ''
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING);
    $password = trim($_POST['password']);

    if (empty($phone) || empty($password)) {
        $response['message'] = "Телефон и пароль обязательны.";
    } else {
        $query = $pdo->prepare("CALL GetUser(:phone)");
        $query->bindParam(':phone', $phone, PDO::PARAM_STR);
        $query->execute();
        $user = $query->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['phone'] = $user['phone'];
            $response['success'] = true;
            $response['message'] = "Успешно";
        } else {
            $response['message'] = "Неправильный телефон или пароль";
        }
    }
}

// Возвращаем JSON-ответ
header('Content-Type: application/json');
echo json_encode($response);
?>
