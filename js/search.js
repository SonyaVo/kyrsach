let selectedId = 0; // Переменная для хранения выбранного ID

function searchBtnHandler(event) {
    console.log(3)
    event.preventDefault();  // Предотвращаем перезагрузку страницы
    const query = document.querySelector('.search-field').value; // Получаем значение из поля поиска
    if (query.length === 0) {
        downloadData(0);  // Загружаем данные для всех кнопок при пустом запросе
    } else {
        downloadData(selectedId);  // Загружаем данные с выбранным ID
    }
}

// Отображение предложений автодополнения
function getAutocompleteSuggestions(query) {
    console.log(4)
    fetch('../bek/getTempleForId.php')  // Укажите путь к вашему PHP-файлу
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Предполагаем, что data.data - это массив объектов храмов
                const suggestions = data.data.filter(item => item.название.toLowerCase().includes(query.toLowerCase())); // Используем поле 'название'
                displayAutocompleteSuggestions(suggestions);
            } else {
                console.error(data.message); // Выводим сообщение об ошибке
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
// Обработчик для автодополнения при вводе текста в поле
document.querySelector('.search-field').oninput = function () {
    let query = this.value;
    if (query.length > 0) {
        getAutocompleteSuggestions(query);  // Получаем предложения автодополнения
    } else {
        document.querySelector('.autocomplete-suggestions').style.display = 'none';  // Скрываем контейнер при пустом вводе
    }
};

// Инициализация данных и привязка событий при загрузке страницы

window.onload = function () {
    console.log(5)
    // Привязываем обработчик кнопки поиска
    document.querySelector('.search-btn').onclick = searchBtnHandler;
};


// Загрузка данных с сервера
function downloadData(id) {
    const buttons = document.querySelectorAll('.map-button');
    console.log(2)
    if (id === 0) {
        buttons.forEach(button => {
            button.style.display = 'block'; // Показываем все кнопки при пустом запросе
        });
    } else {
        // Сначала скрываем все кнопки
        buttons.forEach(button => {
            button.style.display = 'none'; // Скрываем все кнопки
        });

        // Показываем только кнопку с выбранным ID
        const selectedButton = document.querySelector(`.map-button[data-id="${id}"]`);
        if (selectedButton) {
            selectedButton.style.display = 'block'; // Показываем только выбранную кнопку
            console.log(1)
        }
    }
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
            suggestionsContainer.style.display = 'none';  // Скрываем контейнер после выбора
        };
        
        suggestionsContainer.appendChild(suggestionElement);
    });
    suggestionsContainer.style.display = 'block';
}
