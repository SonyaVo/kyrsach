
let ssId = 0;
const modal = document.getElementById('infoModal');
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const vote = document.getElementById('vote');
const closeModal = modal.querySelector('.close');
let isAuthenticated = false;

// Функция для проверки авторизации
async function checkAuthentication() {
    try {
        const response = await fetch('../bek/isAut.php');
        const data = await response.json();
        isAuthenticated = data.isAuthenticated; // Сохраняем статус авторизации
    } catch (err) {
        console.error('Ошибка при проверке авторизации:', err);
    }
}

// Функция для создания содержимого модального окна
function createModalContent(data) {
    return `
        <header>
            <h1>${data.название || 'Название не указано'}</h1>
        </header>
        <div class="body">
            <div class="verx">
                <img src='../styles/images/храмы/${data.Картинка}.jpg' alt='Image' width='300'>
                <div class="info">
                    <p>Престолы: ${data.престол || 'Не указано'}</p>
                    <p>Архитектурные стили: ${data.архитектурный_стиль || 'Не указано'}</p>
                    <p>Год постройки: ${data.год_постройки || 'Не указано'}</p>
                    <p>Год утраты: ${data.год_утраты || 'Не указано'}</p>
                    <p>Архитектор: ${data.архитектор || 'Не указано'}</p>
                    <p>Адрес: ${data.адрес || 'Не указано'}</p>
                    <p>Координаты: ${data.координаты || 'Не указано'}</p>
                    <p>Проезд: ${data.проезд || 'Не указано'}</p>
                </div>
            </div>
            <div class="nis">
                <h2>Краткое описание</h2>
                <p class="opisanie">Краткое описание: ${data.краткое_описание || 'Не указано'}</p>
            </div>
        </div>
    `;
}

// Проверяем авторизацию при загрузке страницы
checkAuthentication().then(() => {
    const buttons = document.querySelectorAll('.placemark');
    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            ssId = id
            try {
                const response = await fetch(`../bek/getInfoTemple.php?id=${id}`);
                const data = await response.json();
                if (data.success) {
                    modalContent.innerHTML = createModalContent(data.data);

                    // Добавляем кнопку, если пользователь авторизован
                    if (isAuthenticated) {
                        vote.innerHTML = `
                        <p>Проголосуйте за восстановление храма! Ваш голос очень важен для нас!</p>
                        <button class="btn" id="voteButton">ГОЛОСОВАТЬ</button>`;
                    } else {
                        vote.innerHTML = `<p class="notAut">Авторизуйтесь или зарегистрируйтесь, чтобы иметь возможность проголосовать за восстановление храма!</p>`;
                    }

                    modal.style.display = 'block'; // Показываем модальное окно
                    overlay.style.display = 'block'; // Показываем оверлей

                    // Обработчик клика на кнопку голосования
                    const voteButton = document.getElementById('voteButton');
                    if (voteButton) {
                        voteButton.addEventListener('click', async () => {
                            console.log('Голосование начато для ID храма:', ssId);
                            try {
                                const response = await fetch('../bek/voting.php', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: `id_temple=${encodeURIComponent(ssId)}`
                                });

                                if (!response.ok) {
                                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                                }

                                const data = await response.json(); // Парсим ответ как JSON
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
                            } catch (err) {
                                console.error('Ошибка при голосовании:', err);
                                alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
                            }
                        });
                    }
                } else {
                    modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
                    modal.style.display = 'block'; // Показываем модальное окно с ошибкой
                    overlay.style.display = 'block'; // Показываем оверлей
                }
            } catch (err) {
                modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
                modal.style.display = 'block'; // Показываем модальное окно с ошибкой
                overlay.style.display = 'block'; // Показываем оверлей
            }
        });
    });
});

// Закрываем модальное окно при нажатии на "×"
closeModal.onclick = function () {
    modal.style.display = 'none';
    overlay.style.display = 'none'; // Скрываем оверлей
}

// Закрываем модальное окно при нажатии вне его
window.onclick = function (event) {
    if (event.target == overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none'; // Скрываем оверлей
    }
}
