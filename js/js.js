document.addEventListener('DOMContentLoaded', () => {
    let isAuthenticated = false; // Переменная для хранения статуса авторизации

    // Функция для проверки авторизации
    function checkAuthentication() {
        return fetch('../bek/isAut.php')
            .then(response => response.json())
            .then(data => {
                isAuthenticated = data.isAuthenticated; // Сохраняем статус авторизации
            })
            .catch(err => {
                console.error('Ошибка при проверке авторизации:', err);
            });
    }

    // Функция для загрузки данных о храмах
    function loadTemples() {
        fetch('../bek/count_voice.php') // Убедитесь, что путь правильный
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const templeList = document.getElementById('temple-list');
                templeList.innerHTML = ''; // Очистка списка перед добавлением новых данных
                if (data.error) {
                    console.error('Ошибка на сервере:', data.error);
                    return; // Прекращаем выполнение, если есть ошибка
                }
                data.forEach(temple => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>${temple.название}</span>
                        <div style='display:inline-block; width:200px; background-color:lightgray;'>
                            <div style='width:${temple.vote_count * 10}px; background-color:green; height:20px;'></div>
                        </div>
                        <span> ${temple.vote_count} голосов</span>
                    `;

                    // Добавляем кнопку голосования только для авторизованных пользователей
                    if (isAuthenticated) {
                        listItem.innerHTML += `
                            <button class="btn voteButton" data-temple-id="${temple.id}">ГОЛОСОВАТЬ</button>
                        `;
                    } else {
                        listItem.innerHTML += `
                            <span class="notAut">Авторизуйтесь или зарегистрируйтесь, чтобы голосовать!</span>
                        `;
                    }

                    templeList.appendChild(listItem);
                });

                // Обработчик клика на кнопки голосования
                const voteButtons = document.querySelectorAll('.voteButton');
                voteButtons.forEach(voteButton => {
                    voteButton.addEventListener('click', () => {
                        const templeId = voteButton.getAttribute('data-temple-id');
                        console.log('Голосование начато для ID храма:', templeId);
                        fetch('../bek/voting.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id_temple=${templeId}`
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Сеть ответила с ошибкой: ' + response.status);
                            }
                            return response.json(); // Парсим ответ как JSON
                        })
                        .then(data => {
                            console.log('Ответ от сервера:', data); // Логируем ответ от сервера
                            if (data.success) {
                                alert(data.message); // Показываем сообщение об успешном голосовании
                                voteButton.remove(); // Удаляем кнопку голосования
                            } else {
                                alert(data.message); // Показываем сообщение об ошибке
                            }
                        })
                        .catch(err => {
                            console.error('Ошибка при голосовании:', err);
                            alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
                        });
                    });
                });
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }

    // Проверяем авторизацию и загружаем данные о храмах при загрузке страницы
    checkAuthentication().then(loadTemples);
});
