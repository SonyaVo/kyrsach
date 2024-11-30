<?php
require 'bek/db.php'; 

// Проверяем наличие параметра id
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];

    // Подготовка SQL-запроса для поиска по ID
    $stmt = $pdo->prepare("SELECT * FROM lost_tempels WHERE id = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();

    // Получаем результат запроса
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Если запись найдена, выводим данные
    if ($result) {
        // Создаем кнопку для вызова модального окна
        echo "<button id='openModalBtn'>Посмотреть информацию</button>";

        // HTML для модального окна
        echo "
        <div id='modal' class='modal'>
            <div class='modal-content'>
                <span class='close'>&times;</span>
                <h3>Результаты поиска:</h3>
                <p>Цвет: " . htmlspecialchars($result['цвет']) . "</p>
                <p>Название: " . htmlspecialchars($result['название']) . "</p>
                <p>Престолы: " . htmlspecialchars($result['престол']) . "</p>
                <p>Архитектурные стили: " . htmlspecialchars($result['архитектурный_стиль']) . "</p>
                <p>Год постройки: " . htmlspecialchars($result['год_постройки']) . "</p>
                <p>Год утраты: " . htmlspecialchars($result['год_утраты']) . "</p>
                <p>Архитектор: " . htmlspecialchars($result['архитектор']) . "</p>
                <p>Адрес: " . htmlspecialchars($result['адрес']) . "</p>
                <p>Координаты: " . htmlspecialchars($result['координаты']) . "</p>
                <p>Проезд: " . htmlspecialchars($result['проезд']) . "</p>
                <p>Краткое описание: " . htmlspecialchars($result['краткое_описание']) . "</p>
                <img src='храмы/"  . htmlspecialchars($result['Картинка']) . ".jpg' alt='Image' width='300'>
            </div>
        </div>
        ";

    } else {
        echo "<p>Запись с таким ID не найдена.</p>";
    }
} else {
    echo "<p>Пожалуйста, введите ID для поиска.</p>";
}
?>
