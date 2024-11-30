<?php require 'bek/toLogIn.php'; ?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Авторизация</title>
    <link rel="stylesheet" href="styles.css">
</head>

<body>

    <div class="container">
        <h1>Авторизация</h1>


        <div class="error-message">
            <?php if ($loginMessage == "Успешно"): ?>
                <!-- Если регистрация успешна, показываем сообщение и перенаправляем пользователя -->
                <p><?php echo $loginMessage; ?>. Вы будете перенаправлены на главную страницу.</p>
            <?php elseif ($loginMessage != ""): ?>
                <!-- Если есть ошибка, показываем сообщение об ошибке -->
                <p><?php echo $loginMessage; ?></p>
            <?php endif; ?>
        </div>

        <form action="" method="POST">
            <div class="form-group">
                <label for="phone">телефон</label>
                <input type="phone" name="phone" id="phone" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" name="password" id="password" required>
            </div>
            <input type="submit" value="Войти" class="btn">
        </form>
    </div>

</body>

</html>