<?php
require 'db.php'; 
try {

    $stmt = $pdo->prepare("CALL GetTempleById(:templeId)");
    $stmt->execute();

    $temples = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($temples) {
        echo json_encode(['success' => true, 'data' => $temples]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Храмы не найдены.']);
    }
} catch (PDOException $e) {
   
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Произошла ошибка при выполнении запроса.']);
}
?>
