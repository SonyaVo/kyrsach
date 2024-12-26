let ssId = 0;
const buttons = document.querySelectorAll('.map-rectangle');
const modal = document.getElementById('infoModal');
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const vote = document.getElementById('vote');
const closeModal = modal.querySelector('.close');
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

// Проверяем авторизацию при загрузке страницы
checkAuthentication().then(() => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id'); // Получаем ID храма
            ssId = id;

            fetch(`../bek/getInfoTemple.php?id=${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {

                        // Если данные успешно получены, отображаем их в модальном окне
                        modalContent.innerHTML = `
                        <header>
    <h1>${data.data.название || 'Название не указано'}</h1>
</header>
<div class="body">
    <div class="verx">
        <img src='../styles/images/храмы/${data.data.Картинка}.jpg' alt='Image' width='300'>
        <div class="info">
            <p>Престолы: ${data.data.престол || 'Не указано'}</p>
            <p>Архитектурные стили: ${data.data.архитектурный_стиль || 'Не указано'}</p>
            <p>Год постройки: ${data.data.год_постройки || 'Не указано'}</p>
            <p>Год утраты: ${data.data.год_утраты || 'Не указано'}</p>
            <p>Архитектор: ${data.data.архитектор || 'Не указано'}</p>
            <p>Адрес: ${data.data.адрес || 'Не указано'}</p>
            <p>Координаты: ${data.data.координаты || 'Не указано'}</p>
            <p>Проезд: ${data.data.проезд || 'Не указано'}</p>
        </div>
    </div>
    <div class="nis">
    <h2>Краткое описание</h2>
    <p class="opisanie">Краткое описание: ${data.data.краткое_описание || 'Не указано'}</p>
    </div>

    </div>
                    `;

                        // Добавляем кнопку, если пользователь авторизован
                        if (isAuthenticated) {

                            vote.innerHTML = '';
                            vote.innerHTML += `
                            <p>Проголосуйте за восстановление храма! Ваш голосо очень важен для нас!</p>
                            <button сlass="btn" id="voteButton">ГОЛОСОВАТЬ</button>`;
                            console.log(vote.innerHTML)

                        }
                        else {
                            // console.log(11111111)
                            // vote.innerHTML = `<p>${data.message}</p>`;

                            vote.innerHTML = `<p class="notAut">Авторизуйтесь или зарегистрируйтесь, чтоб иметь возможность проголосовать за восстановление храма!</p>`;
                            console.log(vote.innerHTML);

                        }
                        modal.style.display = 'block'; // Показываем модальное окно
                        overlay.style.display = 'block'; // Показываем оверлей

                        // Обработчик клика на кнопку голосования
                        const voteButton = document.getElementById('voteButton');
                        if (voteButton) {
                            voteButton.addEventListener('click', () => {
                                console.log('Голосование начато для ID храма:', ssId);
                                fetch('../bek/voting.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: `id_temple=${encodeURIComponent(ssId)}`
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
                                            const successMessage = document.createElement('p');
                                            successMessage.textContent = 'Ваш голос успешно учтен!';
                                            modalContent.appendChild(successMessage); // Добавляем сообщение в модальное окно
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
                        }


                    }
                })
                .catch(err => {
                    modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
                    modal.style.display = 'block'; // Показываем модальное окно с ошибкой
                    overlay.style.display = 'block'; // Показываем оверлей
                });
        });
    });
});

// // Закрываем модальное окно при нажатии на "×"
// closeModal.onclick = function () {
//     modal.style.display = 'none';
//     overlay.style.display = 'none'; // Скрываем оверлей
// }

// Закрываем модальное окно при нажатии вне его
window.onclick = function (event) {
    if (event.target == overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none'; // Скрываем оверлей
    }
}





// let ssId = 0;
// const buttons = document.querySelectorAll('.map-button');
// const modal = document.getElementById('infoModal');
// const overlay = document.getElementById('modalOverlay');
// const modalContent = document.getElementById('modalContent');
// const closeModal = modal.querySelector('.close');

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         const id = button.getAttribute('data-id'); // Получаем ID храма
//         ssId = id;

//         fetch(`../bek/getInfoTemple.php?id=${id}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.success) {
//                 // Если данные успешно получены, отображаем их в модальном окне
//                 modalContent.innerHTML = `
//                     <h1>${data.data.название}</h1>
//                     <p>Название: ${data.data.название}</p>
//                     <p>Престолы: ${data.data.престол}</p>
//                     <p>Архитектурные стили: ${data.data.архитектурный_стиль}</p>
//                     <p>Год постройки: ${data.data.год_постройки}</p>
//                     <p>Год утраты: ${data.data.год_утраты}</p>
//                     <p>Архитектор: ${data.data.архитектор}</p>
//                     <p>Адрес: ${data.data.адрес}</p>
//                     <p>Координаты: ${data.data.координаты}</p>
//                     <p>Проезд: ${data.data.проезд}</p>
//                     <p>Краткое описание: ${data.data.краткое_описание}</p>
//                     <img src='храмы/${data.data.Картинка}.jpg' alt='Image' width='300'>
//                 `;

//                 // Добавляем кнопку, если пользователь авторизован
//                 if (isAuthenticated) {
//                     modalContent.innerHTML += `
//                         <button class="button">Действие для авторизованных</button>
//                     `;
//                 }

//             } else {
//                 modalContent.innerHTML = `<p>${data.message}</p>`;
//             }
//             modal.style.display = 'block'; // Показываем модальное окно
//             overlay.style.display = 'block'; // Показываем оверлей
//         })
//         .catch(err => {
//             modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
//             modal.style.display = 'block'; // Показываем модальное окно с ошибкой
//             overlay.style.display = 'block'; // Показываем оверлей
//         });
//     });
// });

// // Закрываем модальное окно при нажатии на "×"
// closeModal.onclick = function() {
//     modal.style.display = 'none';
//     overlay.style.display = 'none'; // Скрываем оверлей
// }

// // Закрываем модальное окно при нажатии вне его
// window.onclick = function(event) {
//     if (event.target == overlay) {
//         modal.style.display = 'none';
//         overlay.style.display = 'none'; // Скрываем оверлей
//     }
// }
