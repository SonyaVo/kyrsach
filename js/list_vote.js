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
                    const vote_word = padeg(temple.vote_count) ;

                    
                    listItem.innerHTML = `
                        <h2>${temple.название}</h2>
                        <div class="count">
                        <div class="box">
                            <div сlass="in_box" style='width:${temple.vote_count * 5}px; background-color: #613A3D;height: 20px;'></div>
                            </div>
                        
                        <h4> ${vote_word} </h4>
                        </div>
                        
                    `;

                    // Добавляем кнопку голосования или сообщение о том, что пользователь уже проголосовал
                    // if (isAuthenticated) {
                    //     if (temple.user_voted) { // Проверяем, проголосовал ли пользователь
                    //         listItem.innerHTML += `<span>Вы уже проголосовали.</span>`;
                    //     } else {
                    //         listItem.innerHTML += `
                    //             <button class="btn voteButton" data-temple-id="${temple.id}">ГОЛОСОВАТЬ</button>
                    //         `;
                    //     }
                    // } else {
                    //     listItem.innerHTML += `
                    //         <span class="notAut">Авторизуйтесь или зарегистрируйтесь, чтобы голосовать!</span>
                    //     `;
                    // }

                    templeList.appendChild(listItem);
                });

                // // Обработчик клика на кнопки голосования
                // const voteButtons = document.querySelectorAll('.voteButton');
                // voteButtons.forEach(voteButton => {
                //     voteButton.addEventListener('click', () => {
                //         const templeId = voteButton.getAttribute('data-temple-id');
                //         console.log('Голосование начато для ID храма:', templeId);
                //         fetch('../bek/voting.php', {
                //             method: 'POST',
                //             headers: {
                //                 'Content-Type': 'application/x-www-form-urlencoded',
                //             },
                //             body: `id_temple=${templeId}`
                //         })
                //         .then(response => {
                //             if (!response.ok) {
                //                 throw new Error('Сеть ответила с ошибкой: ' + response.status);
                //             }
                //             return response.json(); // Парсим ответ как JSON
                //         })
                //         .then(data => {
                //             console.log('Ответ от сервера:', data); // Логируем ответ от сервера
                //             if (data.success) {
                //                 alert(data.message); // Показываем сообщение об успешном голосовании
                //                 voteButton.remove(); // Удаляем кнопку голосования
                //                 const successMessage = document.createElement('p');
                //                 successMessage.textContent = 'Ваш голос успешно учтен!';
                //                 listItem.appendChild(successMessage); // Добавляем сообщение в элемент списка
                //             } else {
                //                 alert(data.message); // Показываем сообщение об ошибке
                //             }
                //         })
                //         .catch(err => {
                //             console.error('Ошибка при голосовании:', err);
                //             alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
                //         });
                //     });
                // });
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }

    // Проверяем авторизацию и загружаем данные о храмах при загрузке страницы
    checkAuthentication().then(loadTemples);
});

function padeg(n) {
    let recordWord;
    let recordWord2;
    if (n % 10 === 1 && n % 100 !== 11) {
        recordWord2 = "голос";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {

        recordWord2 = "голоса";

    } else {

        recordWord2 = "голосов";
    }
    return `${n} ${recordWord2}`;
}
