<?php
session_start(); // Начало сессии

// Подключение к базе данных
require 'db.php'; // Убедитесь, что у вас есть файл db.php для подключения к базе данных

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $surname = $_POST['surname'] ?? '';
    $name = $_POST['name'] ?? '';
    $patronymic = $_POST['patronymic'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    // Проверка на пустые поля
    if (empty($surname) || empty($name) || empty($patronymic) || empty($email) || empty($message)) {
        echo "Пожалуйста, заполните все поля.";
        exit;
    }

    // Подготовка SQL-запроса для вставки данных
    $sql = "INSERT INTO feedback (surname, name, patronymic, email, message) VALUES (:surname, :name, :patronymic, :email, :message)";

    try {
        $stmt = $pdo->prepare($sql);
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
        echo "Ошибка выполнения запроса: " . $e->getMessage();
    }
} else {
    echo "Неверный метод запроса.";
}
?>
