let ssId = 0;
const buttons = document.querySelectorAll('.map-button');
const modal = document.getElementById('infoModal');
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
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
                        <h1>${data.data.название}</h1>
                        <p>Название: ${data.data.название}</p>
                        <p>Престолы: ${data.data.престол}</p>
                        <p>Архитектурные стили: ${data.data.архитектурный_стиль}</p>
                        <p>Год постройки: ${data.data.год_постройки}</p>
                        <p>Год утраты: ${data.data.год_утраты}</p>
                        <p>Архитектор: ${data.data.архитектор}</p>
                        <p>Адрес: ${data.data.адрес}</p>
                        <p>Координаты: ${data.data.координаты}</p>
                        <p>Проезд: ${data.data.проезд}</p>
                        <p>Краткое описание: ${data.data.краткое_описание}</p>
                        <img src='храмы/${data.data.Картинка}.jpg' alt='Image' width='300'>
                    `;
                    // Добавляем кнопку, если пользователь авторизован
                    if (isAuthenticated) {
                        modalContent.innerHTML += `
                            <button class="button" id="voteButton">Голосовать</button>
                        `;
                    }

                } else {
                    modalContent.innerHTML = `<p>${data.message}</p>`;
                }
                modal.style.display = 'block'; // Показываем модальное окно
                overlay.style.display = 'block'; // Показываем оверлей
            })
            .catch(err => {
                modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
                modal.style.display = 'block'; // Показываем модальное окно с ошибкой
                overlay.style.display = 'block'; // Показываем оверлей
            });
        });
    });
});

// Закрываем модальное окно при нажатии на "×"
closeModal.onclick = function() {
    modal.style.display = 'none';
    overlay.style.display = 'none'; // Скрываем оверлей
}

// Закрываем модальное окно при нажатии вне его
window.onclick = function(event) {
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
