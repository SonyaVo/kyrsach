// Инициализация данных и привязка событий при загрузке страницы
let selectedId = 0; // Переменная для хранения выбранного ID

window.onload = function () {
    document.querySelector('.search-btn').onclick = searchBtnHandler;
};

function searchBtnHandler(event) {
    event.preventDefault();  // Предотвращаем перезагрузку страницы
    const query = document.querySelector('.search-field').value; // Получаем значение из поля поиска
    if (query.length === 0) {
        downloadData(0);  // Загружаем данные для всех кнопок при пустом запросе
    } else {
        console.log("чч");
        console.log(selectedId);
        downloadData(selectedId);  // Загружаем данные с выбранным ID
    }
}

function downloadData(id) {
    console.log('Загружаем данные для ID:', id);
    console.log('Все метки:', placemarks); // Выводим все метки в консоль

    if (id === 0) {
        // Логика для загрузки данных для всех меток
        map.setCenter([55.7558, 37.6173]);
        placemarks.forEach(placemark => {
            placemark[1].options.set('iconImageHref', '../styles/images/купол4.png'); // Показываем иконки для всех меток
        });
    } else {
        // Сначала скрываем все кнопки
        placemarks.forEach(placemark => {
            placemark[1].options.set('iconImageHref', '');  // Скрываем все кнопки
        });

        // Показываем только кнопку с выбранным ID
        console.log("ввв");
        console.log(id);
        
        // Находим выбранную метку по ID
        const selectedPlacemark = placemarks.find(placemark => placemark[0] === id);
        
        if (selectedPlacemark) {
            console.log('Показываем иконку для метки с ID:', id);
            selectedPlacemark[1].options.set('iconImageHref', '../styles/images/купол4.png'); // Показываем только выбранную кнопку
            map.setCenter(selectedPlacemark[1].geometry.getCoordinates());
            map.setZoom(15);
        } else {
            console.error('Метка с ID', id, 'не найдена.');
        }
    }
}

// Обработчик для автодополнения при вводе текста в поле
document.querySelector('.search-field').oninput = function () {
    let query = this.value;
    if (query.length > 0) {
        getAutocompleteSuggestions(query);
    } else {
        document.querySelector('.autocomplete-suggestions').style.display = 'none';
    }
};

// Отображение предложений автодополнения
function getAutocompleteSuggestions(query) {
    fetch('../bek/getTempleForId.php')  // Укажите путь к вашему PHP-файлу
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const suggestions = data.data.filter(item => item.название.toLowerCase().includes(query.toLowerCase()));
                displayAutocompleteSuggestions(suggestions);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayAutocompleteSuggestions(suggestions) {
    let suggestionsContainer = document.querySelector('.autocomplete-suggestions');
    suggestionsContainer.innerHTML = '';  // Очищаем старые предложения

    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    suggestions.forEach(suggestion => {
        let suggestionElement = document.createElement('div');
        suggestionElement.classList.add('autocomplete-suggestion');
        suggestionElement.innerHTML = suggestion.название; // Используем поле 'название'

        suggestionElement.onclick = function () {

            document.querySelector('.search-field').value = suggestion.название; // Устанавливаем значение в поле поиска
            selectedId = suggestion.id; // Сохраняем выбранный ID
            console.log("ааа");
            console.log(suggestion.id);
            
            suggestionsContainer.style.display = 'none';  // Скрываем контейнер после выбора
        };

        suggestionsContainer.appendChild(suggestionElement);
    });
    suggestionsContainer.style.display = 'block';
}



