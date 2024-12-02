// Обработчик для кнопки голосования
modalContent.addEventListener('click', (event) => {
    if (event.target.id === 'voteButton') {
        // Отправляем запрос на голосование
        fetch('../bek/voting.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id_temple=${encodeURIComponent(ssId)}` // Передаем ID храма
        })
        .then(response => {
            // Проверяем, что ответ от сервера корректный
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.text(); // Получаем текст ответа для дальнейшей отладки
        })
        .then(text => {
            console.log('Ответ сервера:', text); // Выводим текст ответа в консоль
            try {
                const data = JSON.parse(text); // Пробуем распарсить текст как JSON
                if (data.success) {
                    alert(data.message);
                    const voteButton = document.getElementById('voteButton');
                    if (voteButton) {
                        voteButton.remove(); // Удаляем кнопку из DOM
                    }
                    const successMessage = document.createElement('p');
                    successMessage.textContent = 'Ваш голос успешно учтен!';
                    modalContent.appendChild(successMessage); // Добавляем сообщение в модальное окно
                } else {
                    alert(data.message); // Уведомляем пользователя об ошибке
                }
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
                alert('Произошла ошибка при обработке ответа сервера.');
            }
        })
        .catch(err => {
            console.error('Ошибка при голосовании:', err);
            alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
        });
    }
});