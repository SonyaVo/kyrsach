<?php
session_start(); // Начало сессии
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=<device-width>, initial-scale=1.0">
    <title>Утраченные храмы</title>
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">

        
        <script src="../js/map.js" defer></script>
</head>

<body>
    <?php
    include 'header.php';
    ?>

    <main>

        <div>
            <!-- для текста перед картой -->

        </div>

        <div class="search-form">
            <input type="text" class="search-field">
            <button class="search-btn">Найти</button>
            <div class="autocomplete-suggestions"></div>

        </div>

        <div class="map-container">
            <div class="map">
                <img src="../styles/images/карта без храмов.png" alt="Карта" id="mapImage">
                <?php for ($i = 1; $i <= 10; $i++): ?>
                    <button class="map-button" data-id="<?= $i ?>" style="top: <?= rand(10, 90) ?>%; left: <?= rand(10, 90) ?>%;">Храм <?= $i ?></button>
                <?php endfor; ?>
            </div>
        </div>

        <!-- Модальное окно -->
        <div id="modalOverlay" style="display:none;"></div>
        <div id="infoModal" style="display:none;">
            <span class="close">&times;</span>
            <h3>Информация о храме</h3>
            <div id="modalContent">Загрузка данных...</div>
            <button class="button">jjj</button>
        </div>

        <!-- <style>
        

        

        #modalOverlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        }

        #infoModal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        z-index: 1001;
        border: 1px solid #000;
        }
        </style>  -->

       

    </main>
    <footer>

    </footer>
    <script src="../js/search.js" defer></script>
    <script src="../js/modalInfo.js" defer></script>
</body>

</html>

<!-- <header>

        <!-- <nav>
            <ul>
                <li><a href="index.php">Главная</a></li>
                <li><a href="catalog.php">Магазин</a></li>
            </ul>
        </nav> 
        <div class="auth">
            <a href="log_in.php">Войти</a> | <a href="sign_in.php">Регистрация</a>
        </div>

        <h1>XXXXXX</h1>
    </header> -->


<!-- <style>