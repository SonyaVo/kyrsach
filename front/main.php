<?php session_start(); // Начало сессии ?>

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
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <div>
            <!-- для текста перед картой -->
        </div>

        <div class="search-form">
            <input type="text" class="search-field" placeholder="Искать здесь....">
            <button class="search-btn">ПОИСК</button>
            <div class="autocomplete-suggestions"></div>
        </div>

        <div class="map-container">
            <div class="map">
                <img src="../styles/images/Карта храмов Москвы.png" alt="Карта" id="mapImage">
                <?php for ($i = 1; $i <= 10; $i++): ?>
                    <button class="map-button" data-id="<?= $i ?>"
                        style="top: <?= rand(10, 90) ?>%; left: <?= rand(10, 90) ?>%;">Храм <?= $i ?></button>
                <?php endfor; ?>
            </div>
        </div>

        <!-- Модальное окно -->
        <div id="modalOverlay" style="display:none;"></div>
        <div id="infoModal" style="display:none;">
            <span class="close">&times;</span>
            <h3>Информация о храме</h3>
            <div id="modalContent">Загрузка данных...</div>
        </div>

        <div class="feedback">
            <div class="header">
                <hr>
                <h2>ОСТАЛИСЬ ВОПРОСЫ?</h2>
                <hr>
            </div>

            <div class="fid_cont">
                <div>
                    <p>Не работает голосование?<br>
                        Есть идеи или предложения?<br>
                        Оставляйте контакты и мы обязательно с<br>Вами свяжемся!</p>
                    <div id="responseMessage" style="display:none;"></div>
                </div>

                <form id="feedbackForm" action="../bek/feedback.php" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label" for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" placeholder="Иванов Иван Иванович" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="name">Имя</label>
                        <input type="text" name="name" id="name" placeholder="Иванов Иван Иванович" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="patronymic">Отчество</label>
                        <input type="text" name="patronymic" id="patronymic" placeholder="Иванов Иван Иванович"
                            required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="email">Почта</label>
                        <input type="email" name="email" id="email" placeholder="ivanov@yandex.ru" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="message">Текст сообщения</label>
                        <textarea name="message" id="message" cols="30" rows="10" placeholder="Введите сообщение"
                            required></textarea>
                    </div>
                    <input class="btn" type="submit" value="Отправить">
                </form>
            </div>
        </div>
    </main>

    <footer>
        <!-- Здесь можно добавить содержимое футера -->
    </footer>


    <script src="../js/search.js" defer></script>
    <script src="../js/modalInfo.js" defer></script>
    <script src="../js/voting.js" defer></script>
    <script src="../js/map.js" defer></script>
    <script src="../js/feedback.js" defer></script>
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