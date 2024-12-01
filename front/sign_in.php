<?php require '../bek/toSignIN.php'; ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
    <script src="js/isAgree.js" defer></script>
</head>

<body>

    <div class="container">
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

                    <div class="form-group" id="agreeGroup">
                        <input type="checkbox" name="agree" id="agree" value="yes">
                        <label for="agree" id="agreeLabel">Согласен с обработкой данных</label>
                    </div>

                    <input class="btn" type="submit" value="Зарегистрироваться">
                </form>
            <?php endif; ?>
        </div>

    </div>

</body>

</html>