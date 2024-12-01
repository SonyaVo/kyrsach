<?php require '../bek/getInfoTemple.php'; ?>

<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Поиск по ID</title>
    <script>
        // Получаем элементы модального окна
        var modal = document.getElementById("modal");
        var btn = document.getElementById("openModalBtn");
        var span = document.getElementsByClassName("close")[0];

        // Открыть модальное окно при клике на кнопку
        btn.onclick = function () {
            modal.style.display = "block";
        }

        // Закрыть модальное окно при клике на элемент с классом "close"
        span.onclick = function () {
            modal.style.display = "none";
        }

        // Закрыть модальное окно, если пользователь кликает вне окна
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>

</head>

<body>
    <style>
        /* Стили для модального окна */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
            padding-top: 60px;
        }

        /* Модальное содержимое */
        .modal-content {
            background-color: #fefefe;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 700px;
        }

        /* Кнопка для закрытия */
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    </style>

    <h1>Поиск по ID</h1>
    <form onsubmit="searchById(); return false;">
        <label for="id">Введите ID:</label>
        <input type="text" name="id" id="id" placeholder="ID храма">
        <button type="submit">Поиск</button>
    </form>

    <div id="results">
        <p>Результаты будут отображаться здесь.</p>
    </div>

</body>

</html>