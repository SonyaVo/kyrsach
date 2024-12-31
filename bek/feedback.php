<?php
session_start(); // Начало сессии

// Подключение к базе данных
require 'db.php'; // Убедитесь, что у вас есть файл db.php для подключения к базе данных

// Генерация токена CSRF, если он еще не установлен
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $surname = $_POST['surname'] ?? '';
    $name = $_POST['name'] ?? '';
    $patronymic = $_POST['patronymic'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    $csrf_token = $_POST['csrf_token'] ?? '';

    
    // // Валидация email
    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     echo "Некорректный адрес электронной почты.";
    //     exit;
    // }

    // Проверка токена CSRF
    // if (!hash_equals($_SESSION['csrf_token'], $csrf_token)) {
    //     echo "Неверный токен CSRF.";
    //     exit;
    // }

    // Подготовка SQL-запроса для вставки данных
    $sql = "INSERT INTO feedback (surname, name, patronymic, email, message) VALUES (:surname, :name, :patronymic, :email, :message)";

    try {
        // Подготовка запроса
        $stmt = $pdo->prepare($sql);
        
        // Привязка параметров
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':patronymic', $patronymic);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);

        // Выполнение запроса
        if ($stmt->execute()) {
            echo "Ваше сообщение успешно отправлено!";
        } else {
            echo "Ошибка при отправке сообщения.";
        }
    } catch (PDOException $e) {
        // Логирование ошибки вместо вывода на экран
        error_log("Ошибка выполнения запроса: " . $e->getMessage());
        echo "Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.";
    }
} else {
    echo "Неверный метод запроса.";
}
?>

