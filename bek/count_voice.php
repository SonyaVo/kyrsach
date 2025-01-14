<?php
session_start();

require 'db.php';

try {
    $stmt = $pdo->prepare("CALL GetTemplesWithVoteCount()");
    $stmt->execute();

    $temples = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($temples);
} catch (PDOException $e) {
    header('Content-Type: application/json', true, 500); // Устанавливаем код ответа 500
    echo json_encode(['error' => 'Ошибка выполнения запроса: ' . $e->getMessage()]);
}
?>