let center = [55.7558, 37.6173]; 
let map;
let ssId = 0;
let isAuthenticated = false; 
let placemarks = []; 

const modal = document.getElementById('infoModal');
const overlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const vote = document.getElementById('vote');

function checkAuthentication() {
    return fetch('../bek/isAut.php')
        .then(response => response.json())
        .then(data => {
            isAuthenticated = data.isAuthenticated; 
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

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');

    fetch('../bek/getInfoToPlacemark.php')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item['координаты']) {
                    console.log(item['координаты'])
                    let coordinates = item['координаты'].trim().split(',').map(Number);
                    let placemark = new ymaps.Placemark(coordinates, {

                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '../styles/images/купол4.png',
                        iconImageSize: [27, 40],
                        iconImageOffset: [-19, -44],
                        className: 'placemark',
                        id: item['id']

                    });

                    map.geoObjects.add(placemark);
                    placemarks.push([item['id'], placemark]);
                    placemark.events.add('click', () => {
                        ssId = item['id'];
                        console.log(ssId);
                        openModal(placemark.options.get('id'));
                    });
                }
                else {
                    console.warn('Координаты отсутствуют для элемента:', item);
                }

            });

        })
        .catch(error => console.error('Ошибка:', error));
}



function openModal(id) {
    fetch(`../bek/getInfoTemple.php?id=${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
            
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

              
                checkUserVote(id).then(hasVoted => {
                    if (hasVoted) {
                        vote.innerHTML = `<p>Вы уже проголосовали за восстановление этого храма!</p>`;
                    } else {
                       
                        if (isAuthenticated) {
                            vote.innerHTML = `
                                <p>Проголосуйте за восстановление храма! Ваш голос очень важен для нас!</p>
                                <button class="btn" id="voteButton">ГОЛОСОВАТЬ</button>`;
                        } else {
                            vote.innerHTML = `<p class="notAut">Авторизуйтесь или зарегистрируйтесь, чтобы иметь возможность проголосовать за восстановление храма!</p>`;
                        }
                    }

                    modal.style.display = 'block'; 
                    overlay.style.display = 'block';

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
                                    return response.json(); 
                                })
                                .then(data => {
                                    console.log('Ответ от сервера:', data); 
                                    if (data.success) {
                                        //alert(data.message); // Показываем сообщение об успешном голосовании
                                        const successMessage = document.createElement('p');
                                        vote.innerHTML = `Ваш голос успешно учтен!`;
                                        modalContent.appendChild(successMessage); 
                                        voteButton.remove(); 
                                    } else {
                                        alert(data.message); 
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
                modal.style.display = 'block'; 
                overlay.style.display = 'block'; 
            }
        })
        .catch(err => {
            modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
            modal.style.display = 'block'; 
            overlay.style.display = 'block'; 
        });
}


async function checkUserVote(templeId) {
    try {
        const response = await fetch(`../bek/voteInfo.php?id=${templeId}`);
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        }

        const data = await response.json();

        if (data.success) {
        
            return data.data[0].user_voted > 0; 
        } else {
            return false; 
        }
    } catch (error) {
        console.error('Ошибка при получении данных о голосовании:', error);
        return false;
    }
}


checkAuthentication().then(() => {
    ymaps.ready(init);
});

window.onclick = function (event) {
    if (event.target == overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none'; 
    }
}

