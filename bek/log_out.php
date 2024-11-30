<?php
session_start();
session_unset(); // Удаление всех данных сессии
session_destroy(); // Завершение сессии

// Перенаправление на страницу входа
header("Location: http://localhost:8081/работа_ht/main.php");
exit();
?>
