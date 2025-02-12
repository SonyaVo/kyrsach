<header>
    <div class="header">
        <img src="../styles/images/logo.svg" alt="лого" class="logo logo1" width="125px" height="125px">

        <div class="names">
            <h3>ЦЕНТР КЛАССИЧЕСКОЙ И ТРАДИЦИОННОЙ АРХИТЕКТУРЫ</h3>
            <h1>СВЯТЫНИ МОСКВЫ</h1>
            <h4>СПЕЦ ПРОЕКТ</h4>
        </div>

        <img src="../styles/images/logo.svg" alt="лого" class="logo logo2" sizes="125px 125px ">
    </div>
    <hr>

    <div class="cont">
        <div class="mes">
            <a href="https://t.me/archclassiccenter">
                <img src="../styles/images/telegram.svg" alt="telegram" class="telegram" width="29px" height="29px"></a>
            <a href="https://www.youtube.com/@archcenter-classic9379/videos">

                <img src="../styles/images/youtube.svg" alt="youtube" class="youtube" width="29px" height="29px"></a>
            <a href="https://vk.com/archcenter_marhi">
                <img src="../styles/images/vk.svg" alt="vk" class="vk" width="29px" height="29px"></a>
        </div>
        <div class="nav">
            <a href="main.php">ГЛАВНАЯ</a>
            <a href="vote.php">ГОЛОСОВАНИЕ</a>
            <a href="feedback.php">ВОПРОСЫ</a>
            <a href="contact.php">КОНТАКТЫ</a>
        </div>
        <div class="cabinet">
            <?php if (isset($_SESSION['user_id'])): ?>
                <a href="profile.php">ЛИЧНЫЙ КАБИНЕТ</a>
            <?php else: ?>
                <a href="log_in.php">ВОЙТИ/</a>
                <a href="../front/sign_in.php">РЕГИСТРАЦИЯ</a>
            <?php endif; ?>
        </div>
    </div>
</header>