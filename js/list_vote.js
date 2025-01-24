document.addEventListener('DOMContentLoaded', () => {
 
    loadTemples();


    function loadTemples() {
        
        fetch('../bek/count_voice.php') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const templeList = document.getElementById('temple-list');
                templeList.innerHTML = ''; 
                if (data.error) {
                    console.error('Ошибка на сервере:', data.error);
                    return; 
                }
                data.forEach(temple => {
                    const listItem = document.createElement('li');
                    const vote_word = padeg(temple.vote_count);

                    listItem.innerHTML = `
                        <h2>${temple.название}</h2>
                        <div class="count">
                        <div class="box">
                            <div class="in_box" style='width:${temple.vote_count * 5}px; background-color: #613A3D;height: 20px;'></div>
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
    let recordWord2;
    if (n % 10 === 1 && n % 100 !== 11) {
        recordWord2 = "голос/<br>10 тыс. голосов";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
        recordWord2 = "голоса/<br>10 тыс. голосов ";
    } else {
        recordWord2 = "голосов/<br>10 тыс. голосов";
    }
    return `${n} ${recordWord2}`;
}
