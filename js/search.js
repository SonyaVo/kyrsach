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



// // Кнопки и модальное окно
// const buttons = document.querySelectorAll('.map-button');
// const modal = document.getElementById('infoModal');
// const overlay = document.getElementById('modalOverlay');
// const modalContent = document.getElementById('modalContent');
// const closeModal = modal.querySelector('.close');

// // Обработка клика по кнопке
// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         const id = selectedId; // Получаем ID храма

//         // Выполняем AJAX-запрос для получения информации
//         fetch(`../bek/getInfoTemple.php?id=${id}`)
//             .then(response => response.text())
//             .then(data => {
//                 modalContent.innerHTML = data;
//                 modal.style.display = 'block';
//                 overlay.style.display = 'block';
//             })
//             .catch(err => {
//                 modalContent.innerHTML = 'Ошибка загрузки данных.';
//             });
//     });
// });

// let ssId = 0;
// const buttons = document.querySelectorAll('.map-button');
//         const modal = document.getElementById('infoModal');
//         const overlay = document.getElementById('modalOverlay');
//         const modalContent = document.getElementById('modalContent');
//         const closeModal = modal.querySelector('.close');

//         buttons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const id = button.getAttribute('data-id'); // Получаем ID храма
//                 ssId = id;
                

                
//                 fetch(`../bek/getInfoTemple.php?id=${id}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.success) {
//                         // Если данные успешно получены, отображаем их в модальном окне
//                         modalContent.innerHTML = `
//                             <h1>${data.data.название}</h1>
//                             <p>Название: ${data.data.название}</p>
//                             <p>Престолы: ${data.data.престол}</p>
//                             <p>Архитектурные стили: ${data.data.архитектурный_стиль}</p>
//                             <p>Год постройки: ${data.data.год_постройки}</p>
//                             <p>Год утраты: ${data.data.год_утраты}</p>
//                             <p>Архитектор: ${data.data.архитектор}</p>
//                             <p>Адрес: ${data.data.адрес}</p>
//                             <p>Координаты: ${data.data.координаты}</p>
//                             <p>Проезд: ${data.data.проезд}</p>
//                             <p>Краткое описание: ${data.data.краткое_описание}</p>
//                             <img src='храмы/${data.data.Картинка}.jpg' alt='Image' width='300'>
//                         `;
//                     } else {
//                         modalContent.innerHTML = `<p>${data.message}</p>`;
//                     }
//                     modal.style.display = 'block'; // Показываем модальное окно
//                     overlay.style.display = 'block'; // Показываем оверлей
//                 })
//                 .catch(err => {
//                     modalContent.innerHTML = '<p>Ошибка загрузки данных.</p>';
//                     modal.style.display = 'block'; // Показываем модальное окно с ошибкой
//                     overlay.style.display = 'block'; // Показываем оверлей
//                 });
//         });
//     });

//     // Закрываем модальное окно при нажатии на "×"
//     closeModal.onclick = function() {
//         modal.style.display = 'none';
//         overlay.style.display = 'none'; // Скрываем оверлей
//     }

//     // Закрываем модальное окно при нажатии вне его
//     window.onclick = function(event) {
//         if (event.target == overlay) {
//             modal.style.display = 'none';
//             overlay.style.display = 'none'; // Скрываем оверлей
//         }
//     }















// function searchBtnHandler(event) {
//     event.preventDefault();  // Предотвращаем перезагрузку страницы
//     downloadData(0);  // Загружаем данные для первой страницы при поисковом запросе
// }

// // Получение автодополнений для ввода из PHP-файла
// function getAutocompleteSuggestions(query) {
//     fetch('../bek/getTemple.php')  // Укажите путь к вашему PHP-файлу
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok: ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 // Предполагаем, что data.data - это массив объектов храмов
//                 const suggestions = data.data.filter(item => item.название.toLowerCase().includes(query.toLowerCase())); // Используем поле 'название'
//                 displayAutocompleteSuggestions(suggestions);
//             } else {
//                 console.error(data.message); // Выводим сообщение об ошибке
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

// // Отображение предложений автодополнения
// function displayAutocompleteSuggestions(suggestions) {
//     let suggestionsContainer = document.querySelector('.autocomplete-suggestions');
//     suggestionsContainer.innerHTML = '';  // Очищаем старые предложения

//     if (suggestions.length === 0) {
//         suggestionsContainer.style.display = 'none';
//         return;
//     }

//     suggestions.forEach(suggestion => {
//         let suggestionElement = document.createElement('div');
//         suggestionElement.classList.add('autocomplete-suggestion');
//         suggestionElement.innerHTML = suggestion.название; // Используем поле 'название'
//         suggestionElement.onclick = function () {
//             document.querySelector('.search-field').value = suggestion.название; // Устанавливаем значение в поле поиска
//             suggestionsContainer.style.display = 'none';  // Скрываем контейнер после выбора
//             downloadData(suggestion.id); // Передаем ID выбранного храма
//         };
//         suggestionsContainer.appendChild(suggestionElement);
//     });
//     suggestionsContainer.style.display = 'block';
// }

// // Обработчик для автодополнения при вводе текста в поле
// document.querySelector('.search-field').oninput = function () {
//     let query = this.value;
//     if (query.length > 0) {
//         getAutocompleteSuggestions(query);  // Получаем предложения автодополнения
//     } else {
//         document.querySelector('.autocomplete-suggestions').style.display = 'none';  // Скрываем контейнер при пустом вводе
//     }
// };

// // Инициализация данных и привязка событий при загрузке страницы
// window.onload = function () {
//     // Привязываем обработчик кнопки поиска
//     document.querySelector('.search-btn').onclick = searchBtnHandler;
// };

// // Загрузка данных с сервера
// function downloadData(selectedId = 0) {

//     if(selectedId == 0){
//         const buttons = document.querySelectorAll('.map-button');
//         buttons.forEach(button => {
//             button.style.display = 'block'; // Скрываем все кнопки
//         });
//     }
//     else{
//     // Сначала скрываем все кнопки
//     const buttons = document.querySelectorAll('.map-button');
//     buttons.forEach(button => {
//         button.style.display = 'none'; // Скрываем все кнопки
//     });

//     // Показываем только кнопку с выбранным ID
//     const selectedButton = document.querySelector(`.map-button[data-id="${selectedId}"]`);
//     if (selectedButton) {
//         selectedButton.style.display = 'block'; // Показываем только выбранную кнопку
//     }
//     }
// }



// // Кнопки и модальное окно
// const buttons = document.querySelectorAll('.map-button');
// const modal = document.getElementById('infoModal');
// const overlay = document.getElementById('modalOverlay');
// const modalContent = document.getElementById('modalContent');
// const closeModal = modal.querySelector('.close');

// // Обработка клика по кнопке
// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         const id = button.dataset.id; // Получаем ID храма

//         // Выполняем AJAX-запрос для получения информации
//         fetch(`../bek/search.php?id=${id}`)
//             .then(response => response.text())
//             .then(data => {
//                 modalContent.innerHTML = data;
//                 modal.style.display = 'block';
//                 overlay.style.display = 'block';
//             })
//             .catch(err => {
//                 modalContent.innerHTML = 'Ошибка загрузки данных.';
//             });
//     });
// });
























// // Загрузка данных с сервера
// function downloadData(page = 1) {
//     let factsList = document.querySelector('.facts-list');
//     let url = new URL(factsList.dataset.url);
//     let perPage = document.querySelector('.per-page-btn').value;
//     url.searchParams.append('page', page);  //добавление к адресу параметров поиска
//     url.searchParams.append('per-page', perPage);

//     // Получаем значение из поля поиска
//     let searchQuery = document.querySelector('.search-field').value;
//     if (searchQuery) {
//         url.searchParams.append('q', searchQuery);  // Добавляем параметр поиска
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.responseType = 'json';
//     xhr.onload = function () {
//         renderRecords(this.response.records);
//         setPaginationInfo(this.response['_pagination']);
//         renderPaginationElement(this.response['_pagination']);
//     };
//     xhr.send();
// }


// function searchBtnHandler(event) {
//     event.preventDefault();  // Предотвращаем перезагрузку страницы
//     downloadData(1);  // Загружаем данные для первой страницы при поисковом запросе
// }

// // Получение автодополнений для ввода
// function getAutocompleteSuggestions(query) {
//     let url = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete');
//     url.searchParams.append('q', query);

//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.responseType = 'json';
//     xhr.onload = function () {
//         displayAutocompleteSuggestions(this.response);
//     };
//     xhr.send();
// }


// // Отображение предложений автодополнения
// function displayAutocompleteSuggestions(suggestions) {
//     let suggestionsContainer = document.querySelector('.autocomplete-suggestions');
//     suggestionsContainer.innerHTML = '';  // Очищаем старые предложения

//     if (suggestions.length === 0) {
//         suggestionsContainer.style.display = 'none';
//         return;
//     }

//     suggestions.forEach(suggestion => {
//         let suggestionElement = document.createElement('div');
//         suggestionElement.classList.add('autocomplete-suggestion');
//         suggestionElement.innerHTML = suggestion;
//         suggestionElement.onclick = function () {
//             document.querySelector('.search-field').value = suggestion;
//             suggestionsContainer.style.display = 'none';  // Скрываем контейнер после выбора
//         };
//         suggestionsContainer.appendChild(suggestionElement);
//     });
//     suggestionsContainer.style.display = 'block';
// }

// // Обработчик для автодополнения при вводе текста в поле
// document.querySelector('.search-field').oninput = function () {
//     let query = this.value;
//     if (query.length > 0) {
//         getAutocompleteSuggestions(query);  // Получаем предложения автодополнения
//     } else {
//         document.querySelector('.autocomplete-suggestions').style.display = 'none';  // Скрываем контейнер при пустом вводе
//     }
// };

// // Инициализация данных и привязка событий при загрузке страницы
// window.onload = function () {
    
//     // Привязываем обработчик кнопки поиска
//     document.querySelector('.search-btn').onclick = searchBtnHandler;
// };




