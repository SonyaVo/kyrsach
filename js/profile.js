// Загрузка данных пользователя и голосов при открытии страницы
async function loadUserData() {
    const resultDiv = document.getElementById('result');

    try {
        // Загрузка данных пользователя
        const userResponse = await fetch('../bek/get_user.php');
        if (!userResponse.ok) {
            throw new Error(`HTTP error! status: ${userResponse.status}`);
        }
        const userData = await userResponse.json();

        if (userData.success) {
            const user = userData.data;
            resultDiv.innerHTML += `
                <div class="user-info">
                    <p><strong>Фамилия:</strong> ${user.surname}</p>
                    <p><strong>Имя:</strong> ${user.name}</p>
                    <p><strong>Отчество:</strong> ${user.patronymic}</p>
                    <p><strong>Телефон:</strong> ${user.phone}</p>
                    <p><strong>Почта:</strong> ${user.email}</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML += `<p class="error">${userData.message}</p>`;
        }

        // Загрузка голосов
        const votesResponse = await fetch('../bek/get_user_votes.php');
        if (!votesResponse.ok) {
            throw new Error(`HTTP error! status: ${votesResponse.status}`);
        }
        const votesData = await votesResponse.json();

        // Проверка, является ли votesData массивом
        if (votesData.success && Array.isArray(votesData.data)) {
            votesData.data.forEach(church => {
                const churchDiv = document.createElement('div');
                churchDiv.classList.add('church');

                const churchName = document.createElement('h2');
                churchName.textContent = church.название;

                const voteCount = document.createElement('p');
                voteCount.textContent = `Голосов: ${church.vote_count}`;

                // Создание шкалы голосования
                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                progressBar.style.width = `${(church.vote_count / 100) * 100}%`; // Пример, если 100 - максимальное количество голосов

                churchDiv.appendChild(churchName);
                churchDiv.appendChild(voteCount);
                churchDiv.appendChild(progressBar);
                resultDiv.appendChild(churchDiv);
            });
        } else {
            resultDiv.innerHTML += `<p class="error">Ошибка: данные голосов не являются массивом.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML += `<p class="error">An error occurred: ${error.message}</p>`;
    }
}

// Запуск функции при загрузке страницы
document.addEventListener('DOMContentLoaded', loadUserData);
