<?php session_start(); // Начало сессии ?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет</title>
    <link rel="stylesheet" href="../styles/style.css">
    <link rel="stylesheet" href="../styles/profile.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">
</head>

<body>
    <?php include 'header.php'; ?>
    <main>
        <div class="profile">
            <div class="image-container">
                <img src="../styles/images/user.png" alt="Описание изображения" width="359" height="324">
            </div>
        
            <div class="info" id="result"></div>
            
            <div class="fun">
            
                <a href="../bek/log_out.php" class="logout-link">ВЫЙТИ</a>
            </div>


        </div>
        <div class="fun1">
                <a href="../bek/log_out.php" class="logout-link">ВЫЙТИ</a>
            </div>
        <ul class="vote" id="vote"></ul>

        <div class="feedback" id="feedback"></div>

    
    </main>

    <?php include 'footer.php'; ?>
    <script src="../js/profile.js" defer></script>
</body>

</html>