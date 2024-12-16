<?php
require 'db.php'; // Подключение к базе данных

try {
    // SQL-запрос для получения всех храмов
    $stmt = $pdo->prepare("SELECT id, название FROM lost_tempels");
    $stmt->execute();

    $temples = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($temples) {
        echo json_encode(['success' => true, 'data' => $temples]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Храмы не найдены.']);
    }
} catch (PDOException $e) {
    // Логируем ошибку на сервере
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Произошла ошибка при выполнении запроса.']);
}
?>
