<?php
session_start(); 

require 'db.php';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $surname = $_POST['surname'] ?? '';
    $name = $_POST['name'] ?? '';
    $patronymic = $_POST['patronymic'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';
    $csrf_token = $_POST['csrf_token'] ?? '';

 
    $sql = "INSERT INTO feedback (surname, name, patronymic, email, message) VALUES (:surname, :name, :patronymic, :email, :message)";

    try {
       
        $stmt = $pdo->prepare($sql);
     
        $stmt->bindParam(':surname', $surname);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':patronymic', $patronymic);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':message', $message);

        if ($stmt->execute()) {
            echo "Ваше сообщение успешно отправлено!";
        } else {
            echo "Ошибка при отправке сообщения.";
        }
    } catch (PDOException $e) {

        error_log("Ошибка выполнения запроса: " . $e->getMessage());
        echo "Ошибка при отправке сообщения. Пожалуйста, попробуйте позже.";
    }
} else {
    echo "Неверный метод запроса.";
}
?>

