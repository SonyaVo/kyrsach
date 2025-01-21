document.addEventListener('DOMContentLoaded', () => {


    // Функция для загрузки данных о храмах
    function loadTemples() {
        fetch('../bek/count_voice.php') // Убедитесь, что путь правильный
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const templeList = document.getElementById('temple-list');
                templeList.innerHTML = ''; // Очистка списка перед добавлением новых данных
                if (data.error) {
                    console.error('Ошибка на сервере:', data.error);
                    return; // Прекращаем выполнение, если есть ошибка
                }
                data.forEach(temple => {
                    const listItem = document.createElement('li');
                    const vote_word = padeg(temple.vote_count) ;

                    
                    listItem.innerHTML = `
                        <h2>${temple.название}</h2>
                        <div class="count">
                        <div class="box">
                            <div сlass="in_box" style='width:${temple.vote_count * 5}px; background-color: #613A3D;height: 20px;'></div>
                            </div>
                        
                        <h4> ${vote_word} </h4>
                        </div>
                        
                    `;

                    templeList.appendChild(listItem);
                });

             
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }


});

function padeg(n) {
    let recordWord;
    let recordWord2;
    if (n % 10 === 1 && n % 100 !== 11) {
        recordWord2 = "голос";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {

        recordWord2 = "голоса";

    } else {

        recordWord2 = "голосов";
    }
    return `${n} ${recordWord2}`;
}
