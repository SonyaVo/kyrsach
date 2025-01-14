<?php
require 'db.php'; 

$sql = "SELECT * FROM lost_tempels"; 
$stmt = $pdo->prepare($sql);
$stmt->execute();

$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
?>