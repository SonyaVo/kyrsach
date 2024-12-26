let center = [55.7558, 37.6173]; // Центр карты (Москва)

function init() {
    let map = new ymaps.Map('map-test', {
        center: center,
        zoom: 13
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил

    // Получаем данные из базы данных (пример с использованием fetch)
    fetch('../bek/getInfoToPlacemark.php')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Выводим данные в консоль для проверки
            data.forEach(item => {
                if (item['координаты']) {
                    let coordinates = item['координаты'].trim().split(',').map(Number);
                    let placemark = new ymaps.Placemark(coordinates, {
                        balloonContent: `
        <header>
            <h1>${item['название'] || 'Название не указано'}</h1>
        </header>
        <div class="body">
            <div class="verx">
                <img src='../styles/images/храмы/${item['Картинка']}.jpg' alt='Image' width='300'>
                <div class="info">
                    <p>Престолы: ${item['престол'] || 'Не указано'}</p>
                    <p>Архитектурные стили: ${item['архитектурный_стиль'] || 'Не указано'}</p>
                    <p>Год постройки: ${item['год_постройки'] || 'Не указано'}</p>
                    <p>Год утраты: ${item['год_утраты ']|| 'Не указано'}</p>
                    <p>Архитектор: ${item['архитектор'] || 'Не указано'}</p>
                    <p>Адрес: ${item['адрес'] || 'Не указано'}</p>
                    <p>Координаты: ${item['.координаты ']|| 'Не указано'}</p>
                    <p>Проезд: ${item['проезд'] || 'Не указано'}</p>
                </div>
            </div>
            <div class="nis">
                <h2>Краткое описание</h2>
                <p class="opisanie">Краткое описание: ${data.краткое_описание || 'Не указано'}</p>
            </div>
        </div>
    `
						// `<strong>${item['название']}</strong><br>${item['краткое_описание']}`
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '../styles/images/купол4.png',
                        iconImageSize: [27, 40],
                        iconImageOffset: [-19, -44],
						className: 'placemark', // Ваш пользовательский класс
						id: item['id'] // Предполагается, что у вас есть поле 'id' в данных
                    });

                    map.geoObjects.add(placemark);
                } else {
                    console.warn('Координаты отсутствуют для элемента:', item);
                }
            });
        })
        .catch(error => console.error('Ошибка:', error));
}

ymaps.ready(init);
