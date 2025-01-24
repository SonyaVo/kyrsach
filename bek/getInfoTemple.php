<?php
require 'db.php'; 

if (!isset($_GET['id']) || !filter_var($_GET['id'], FILTER_VALIDATE_INT)) {
    echo json_encode(['success' => false, 'message' => 'ID не указан или некорректен.']);
    exit;
}

$id = intval($_GET['id']); 
$sql = "CALL GetTempleById(:templeId)";

try {

    $stmt = $pdo->prepare(query: $sql);
    $stmt->bindParam(':templeId', $id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['success' => true, 'data' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Запись с таким ID не найдена.']);
    }
} catch (PDOException $e) {
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Произошла ошибка при выполнении запроса.']);
}
?>
