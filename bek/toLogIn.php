<?php
session_start();
require 'db.php'; 
$loginMessage = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = $_POST['phone'];
    $password = $_POST['password'];

  
    if ($phone === '89999999999' && $password === 'admin') {
    
        $_SESSION['user_id'] = 'admin';
        $_SESSION['phone'] = $phone;

        header("Location: admin_main.php");
        exit();
    }

    $query = $pdo->prepare("SELECT * FROM users WHERE phone = ?");
    $query->execute([$phone]);
    $user = $query->fetch();

    if ($user && password_verify($password, $user['password'])) {
  
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['phone'] = $user['phone'];

        header("Location: main.php");
        exit();
    } else {
        $loginMessage = "Неправильный телефон или пароль";
    }
}
?>
