<?php
session_start(); // Начало сессии
?>


<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0">
    <title>Голосование</title>

    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/voting.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">
</head>


<body>
    <?php
    include 'header.php';
    ?>

    <main>
        <div class="cont_main">
            <div class="text_main">
                <p>Вы попали на страницу "Голосование"! Здесь вы можете ознакомится со списком утраченных храмов, а так
                    же
                    узнать информацию о количестве проголосоващих за них польpователей.</p><br>
                <p>Храмы набравшие больше 10 тыс. голосов будут расмотрены Администратором!</p><br>
                <p>Переходите на главную и поддержите восстановление храмов вместе с нами!</p><br>

            </div>
            <ul id="temple-list"></ul>
        </div>
    </main>
    <?php include 'footer.php'; ?>
    <script src="../js/list_vote.js" defer></script>

</body>


</html>