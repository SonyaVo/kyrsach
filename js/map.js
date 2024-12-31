let center = [55.7558, 37.6173]; // Центр карты (Москва)
let map;
let ssId = 0;
let isAuthenticated = false; // Переменная для хранения статуса авторизации
let placemarks = []; // Инициализация массива меток

const modal = document.getElementById('infoModal');
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const vote = document.getElementById('vote');

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

function init() {
    map = new ymaps.Map('map-test', {
        center: center,
        zoom: 13
    });

    // Удаляем ненужные элементы управления
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    // map.controls.remove('fullscreenControl');
    // map.controls.remove('zoomControl');
    // map.controls.remove('rulerControl');

    // Получаем данные из базы данных
    fetch('../bek/getInfoToPlacemark.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Выводим данные в консоль для проверки
            data.forEach(item => {
                if (item['координаты']) {
                    console.log(item['координаты'])
                    let coordinates = item['координаты'].trim().split(',').map(Number);
                    let placemark = new ymaps.Placemark(coordinates, {
                        // balloonContent: `
                        //     <strong>${item['название']}</strong><br>${item['краткое_описание']}`
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '../styles/images/купол4.png',
                        iconImageSize: [27, 40],
                        iconImageOffset: [-19, -44],
                        className: 'placemark',
                        id: item['id']

                    });
                    // console.log([item['название']]);
                    // console.log([item['id']]);
                    map.geoObjects.add(placemark);

                    placemarks.push([item['id'], placemark]);
                    // Добавляем обработчик клика на метку
                    placemark.events.add('click', () => {


                        // console.log([item['id']]);
                        ssId = item['id']; // Сохраняем ID храма
                        console.log(ssId);
                        openModal(placemark.options.get('id')); // Открываем модальное окно
                    });



                }
                else {
                    console.warn('Координаты отсутствуют для элемента:', item);
                }

            });

        })
        .catch(error => console.error('Ошибка:', error));
}

// Функция для открытия модального окна
// ... (previous code remains unchanged)

function openModal(id) {
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

                // Проверяем, проголосовал ли пользователь
                checkUserVote(id).then(hasVoted => {
                    if (hasVoted) {
                        vote.innerHTML = `<p>Вы уже проголосовали за восстановление этого храма!</p>`;
                    } else {
                        // Добавляем кнопку, если пользователь авторизован
                        if (isAuthenticated) {
                            vote.innerHTML = `
                                <p>Проголосуйте за восстановление храма! Ваш голос очень важен для нас!</p>
                                <button class="btn" id="voteButton">ГОЛОСОВАТЬ</button>`;
                        } else {
                            vote.innerHTML = `<p class="notAut">Авторизуйтесь или зарегистрируйтесь, чтобы иметь возможность проголосовать за восстановление храма!</p>`;
                        }
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
                                        //alert(data.message); // Показываем сообщение об успешном голосовании
                                        const successMessage = document.createElement('p');
                                        vote.innerHTML = `Ваш голос успешно учтен!`;
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
                });
            } else {
                modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
                modal.style.display = 'block'; // Показываем модальное окно с ошибкой
                overlay.style.display = 'block'; // Показываем оверлей
            }
        })
        .catch(err => {
            modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
            modal.style.display = 'block'; // Показываем модальное окно с ошибкой
            overlay.style.display = 'block'; // Показываем оверлей
        });
}

// Функция для проверки, проголосовал ли пользователь
async function checkUserVote(templeId) {
    try {
        const response = await fetch(`../bek/voteInfo.php?id=${templeId}`);
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }

        const data = await response.json();

        // Проверяем, есть ли информация о голосовании
        if (data.success) {
            // Предполагаем, что в data.data[0] есть поле user_voted
            return data.data[0].user_voted > 0; // Возвращаем true, если пользователь уже голосовал
        } else {
            return false; // Если нет данных, возвращаем false
        }
    } catch (error) {
        console.error('Ошибка при получении данных о голосовании:', error);
        return false; // В случае ошибки возвращаем false
    }
}

// Проверяем авторизацию при загрузке страницы
checkAuthentication().then(() => {
    ymaps.ready(init);
});

// Закрываем модальное окно при нажатии вне его
window.onclick = function (event) {
    if (event.target == overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none'; // Скрываем оверлей
    }
}

