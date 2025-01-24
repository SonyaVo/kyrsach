<?php
session_start(); 
session_regenerate_id(true);

$isAuthenticated = isset($_SESSION['user_id']); 

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate'); 
header('Pragma: no-cache'); 
header('Expires: 0'); 

echo json_encode(['isAuthenticated' => $isAuthenticated]);
?>
