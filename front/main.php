<?php session_start(); // Начало сессии ?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0">
    <title>Утраченные храмы</title>
    
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/search.css">
    <link rel="stylesheet" href="../styles/map.css">
    <link rel="stylesheet" href="../styles/feedback.css">
    <link rel="stylesheet" href="../styles/modal.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">
</head>

<body>
    <?php include 'header.php'; ?>

    <main>
        <div class="cont_main">
        <div>
            <!-- для текста перед картой -->
        </div>

        <div class="search-form">
            <input type="text" class="search-field" placeholder="Искать здесь....">
            <button class="search-btn">ПОИСК</button>
            <div class="autocomplete-suggestions"></div>
        </div>




        <div id="map-test" class="map"></div>

        <script src="https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&lang=ru_RU">
        </script>
        



        <!-- Модальное окно -->
        <div class="modalOverlay" id="modalOverlay"></div>
        <div class="infoModal" id="infoModal">
            <div class="modalContent" id="modalContent">Загрузка данных...</div>
            <div class="vote" id="vote"></div>
        </div>

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
                    <div class="responseMessage" id="responseMessage" style="display:none;"></div>
                </div>

                <form class="feedbackForm" id="feedbackForm" action="../bek/feedback.php" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label" for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" placeholder="Иванов" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="name">Имя</label>
                        <input type="text" name="name" id="name" placeholder="Иван" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="patronymic">Отчество</label>
                        <input type="text" name="patronymic" id="patronymic" placeholder="Иванович">
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
       Данные взяты с:<a href="https://sobory.ru/"> Собор.ру</a>
    </footer>


   
    <script src="../js/map.js" defer></script>

  
    <script src="../js/feedback.js" defer></script>
    <script src="../js/search.js" defer></script>
</body>

</html>

