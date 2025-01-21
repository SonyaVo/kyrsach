<?php
require 'db.php'; // Подключение к базе данных

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = (int) $_GET['id'];

    // SQL-запрос для поиска храма по ID
    $stmt = $pdo->prepare("CALL GetTempleById(:templeId)");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo "<p><strong>Цвет:</strong> " . htmlspecialchars($result['цвет']) . "</p>";
        echo "<p><strong>Название:</strong> " . htmlspecialchars($result['название']) . "</p>";
        echo "<p><strong>Престолы:</strong> " . htmlspecialchars($result['престол']) . "</p>";
        echo "<p><strong>Архитектурные стили:</strong> " . htmlspecialchars($result['архитектурный_стиль']) . "</p>";
        echo "<p><strong>Год постройки:</strong> " . htmlspecialchars($result['год_постройки']) . "</p>";
        echo "<p><strong>Год утраты:</strong> " . htmlspecialchars($result['год_утраты']) . "</p>";
        echo "<p><strong>Архитектор:</strong> " . htmlspecialchars($result['архитектор']) . "</p>";
        echo "<p><strong>Адрес:</strong> " . htmlspecialchars($result['адрес']) . "</p>";
        echo "<p><strong>Координаты:</strong> " . htmlspecialchars($result['координаты']) . "</p>";
        echo "<p><strong>Краткое описание:</strong> " . htmlspecialchars($result['краткое_описание']) . "</p>";
        echo "<img src='храмы/" . htmlspecialchars($result['Картинка']) . ".jpg' alt='Изображение храма' width='300'>";
    } else {
        echo "<p>Храм с таким ID не найден.</p>";
    }
} else {
    echo "<p>ID храма не указан.</p>";
}
?>
