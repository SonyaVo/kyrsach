<header>
    <div class="header text-center">
        <img src="../styles/images/ЦКИТА4 жел.png" alt="лого" class="logo" width="125px" height="125px">
        <div class="names">
            <h3>ЦЕНТР КЛАССИЧЕСКОЙ И ТРАДИЦИОННОЙ АРХИТЕКТУРЫ</h3>
            <h1>СВЯТЫНИ МОСКВЫ</h1>
            <h4>СПЕЦ ПРОЕКТ</h4>
        </div>
        <img src="../styles/images/ЦКИТА4 белый.png" alt="лого" class="logo" width="125px" height="125px">
    </div>
    <hr>

    <nav class="navbar navbar-expand-lg navbar-light bg-light cont">
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="main.php">ГЛАВНАЯ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="vote.php">ГОЛОСОВАНИЕ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="contact.php">КОНТАКТЫ</a>
                </li>
            </ul>
            <div class="navbar-nav">
                <div class="mes">
                    <a href="https://hramovoe-zodchestvo.ru/freski">
                        <img src="../styles/images/telegram.svg" alt="telegram" class="telegram" width="29px" height="29px"></a>
                    <img src="../styles/images/youtube.svg" alt="youtube" class="youtube" width="29px" height="29px">
                    <img src="../styles/images/vk.svg" alt="vk" class="vk" width="29px" height="29px">
                </div>
                <div class="cabinet nav-item">
                    <?php if (isset($_SESSION['user_id'])): ?>
                        <a class="nav-link" href="profile.php">Личный кабинет</a>
                    <?php else: ?>
                        <a class="nav-link" href="log_in.php">Войти</a>
                        <a class="nav-link" href="../front/sign_in.php">Регистрация</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </nav>
</header>
