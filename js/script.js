let center = [55.7558, 37.6173]; // Центр карты (Москва)

function init() {
    let map = new ymaps.Map('map-test', {
        center: center,
        zoom: 12
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
                        balloonContent: `<strong>${item['название']}</strong><br>${item['краткое_описание']}`
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '../styles/images/купол4.png',
                        iconImageSize: [27, 40],
                        iconImageOffset: [-19, -44]
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
