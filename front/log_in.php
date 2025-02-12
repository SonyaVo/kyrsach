
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
    <link rel="stylesheet" href="../styles/log_in.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">
   
</head>

<body>

    <div class="cont">
        <h1>АВТОРИЗАЦИЯ</h1>

        <div class="text-centre">
            <div id="messageContainer"></div> 

            <form id="loginForm" method="POST">
                <div class="form-group">
                    <label for="phone">Телефон:</label>
                    <input type="phone" name="phone" id="phone" required placeholder="89998887766">
                </div>
                <div class="form-group">
                    <label for="password">Пароль:</label>
                    <input type="password" name="password" id="password" required>
                </div>
                <input type="submit" value="ВОЙТИ" class="btn">
            </form>
        </div>

    </div>
    <script src="../js/log_in.js" defer></script>

</body>

</html>
