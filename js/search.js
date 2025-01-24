
let selectedId = 0; 

window.onload = function () {
    document.querySelector('.search-btn').onclick = searchBtnHandler;
};

function searchBtnHandler(event) {
    event.preventDefault();  
    const query = document.querySelector('.search-field').value; 
    if (query.length === 0) {
        downloadData(0);  
    } else {
        
        downloadData(selectedId);  
    }
}

function downloadData(id) {
    console.log('Загружаем данные для ID:', id);
    console.log('Все метки:', placemarks); 

    if (id === 0) {
       
        map.setCenter([55.7558, 37.6173]);
        placemarks.forEach(placemark => {
            placemark[1].options.set('iconImageHref', '../styles/images/купол4.png');
        });
    } else {
        
        placemarks.forEach(placemark => {
            placemark[1].options.set('iconImageHref', ''); 
        });

        const selectedPlacemark = placemarks.find(placemark => placemark[0] === id);
        
        if (selectedPlacemark) {
            console.log('Показываем иконку для метки с ID:', id);
            selectedPlacemark[1].options.set('iconImageHref', '../styles/images/купол4.png'); 
            map.setCenter(selectedPlacemark[1].geometry.getCoordinates());
            map.setZoom(15);
        } else {
            console.error('Метка с ID', id, 'не найдена.');
        }
    }
}

document.querySelector('.search-field').oninput = function () {
    let query = this.value;
    if (query.length > 0) {
        getAutocompleteSuggestions(query);
    } else {
        document.querySelector('.autocomplete-suggestions').style.display = 'none';
    }
};

function getAutocompleteSuggestions(query) {
    console.log(111);
    fetch('../bek/getTemple.php')  
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
    suggestionsContainer.innerHTML = '';  

    if (suggestions.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    suggestions.forEach(suggestion => {
        let suggestionElement = document.createElement('div');
        suggestionElement.classList.add('autocomplete-suggestion');
        suggestionElement.innerHTML = suggestion.название; 

        suggestionElement.onclick = function () {

            document.querySelector('.search-field').value = suggestion.название; 
            selectedId = suggestion.id; 
            console.log("ааа");
            console.log(suggestion.id);
            
            suggestionsContainer.style.display = 'none';  
        };

        suggestionsContainer.appendChild(suggestionElement);
    });
    suggestionsContainer.style.display = 'block';
}



