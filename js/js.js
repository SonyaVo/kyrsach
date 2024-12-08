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
                    listItem.innerHTML = `
                        <span>${temple.название}</span> <!-- Измените здесь на 'название' -->
                        <div style='display:inline-block; width:200px; background-color:lightgray;'>
                            <div style='width:${temple.vote_count * 10}px; background-color:green; height:20px;'></div>
                        </div>
                        <span> ${temple.vote_count} голосов</span>
                        <form action='http://localhost/project/backend/vote.php' method='post' style='display:inline;'>
                            <input type='hidden' name='temple_id' value='${temple.id}'>
                            <button type='submit'>Голосовать</button>
                        </form>
                    `;
                    templeList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }

    // Загрузка данных о храмах при загрузке страницы
    loadTemples();
});
