<?php
session_start();
include 'db.php'; // Подключение к базе данных

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Подготовка SQL-запроса
    $query = "
        SELECT lt.id, lt.название, COUNT(v.id) AS vote_count 
FROM lost_tempels lt 
LEFT JOIN voting v ON lt.id = v.id_temple AND v.id_user = ?
GROUP BY lt.id
HAVING vote_count > 0
    ";

    $stmt = $pdo->prepare($query);
    $stmt->bindParam(1, $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $churches = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'data' => $churches]);
} catch (PDOException $e) {
    error_log("Ошибка выполнения запроса: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Ошибка выполнения запроса.']);
}
?>
