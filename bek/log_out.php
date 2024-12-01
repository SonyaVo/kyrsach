<?php
session_start();
session_unset(); // Удаление всех данных сессии
session_destroy(); // Завершение сессии

// Перенаправление на страницу входа
header("Location: ../front/main.php");
exit();
?>
