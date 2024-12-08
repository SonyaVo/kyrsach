<?php require '../bek/toSignIN.php'; ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="stylesheet" href="../styles/sign_in.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Kosugi&family=Marmelad&family=Oranienbaum&display=swap"
        rel="stylesheet">
    <script src="js/isAgree.js" defer></script>
</head>

<body>

    <div class="cont">
        <h1>Регистрация</h1>

        <div class="text-centre">
            <?php if ($signMessage): ?>
                <p><?php echo $signMessage; ?></p>
                <!-- Кнопка "Войти", которая появится только если регистрация успешна -->
                <a href="log_in.php" class="btn">Войти</a>
            <?php else: echo $signMessage
                ?>
                <!-- Форма регистрации -->
                <form id="registrationForm" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <label class="form-label" for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="name">Имя</label>
                        <input type="text" name="name" id="name" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="patronymic">Отчество</label>
                        <input type="text" name="patronymic" id="patronymic">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="phone">Номер телефона</label>
                        <input type="phone" name="phone" id="phone" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="email">Почта</label>
                        <input type="email" name="email" id="email" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="password">Пароль</label>
                        <input type="password" name="password" id="password" required>
                    </div>

                    <div class="" id="agreeGroup">
                        <input class="check" type="checkbox" name="agree" id="agree" value="yes">
                        <label for="agree" id="agreeLabel">Согласен с обработкой данных</label>
                    </div>

                    <input class="btn" type="submit" value="ЗАРЕГИСТРИРОВАТЬСЯ">
                </form>
            <?php endif; ?>
        </div>

    </div>

</body>

</html>