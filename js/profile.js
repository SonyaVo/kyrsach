
// Загрузка данных пользователя при открытии страницы
async function loadUserData() {
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('../bek/get_user.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.success) {
            const user = data.data;
            resultDiv.innerHTML = `
                <div class="user-info">
                    <h2>User Information</h2>
                    <p><strong>Фамилия:</strong> ${user.surname}</p>
                    <p><strong>Имя:</strong> ${user.name}</p>
                    <p><strong>Отчество:</strong> ${user.patronymic}</p>
                    <p><strong>Телефон:</strong> ${user.phone}</p>
                    <p><strong>Почта:</strong> ${user.email}</p>
                </div>

            `;
        } else {
            resultDiv.innerHTML = `<p class="error">${data.message}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">An error occurred: ${error.message}</p>`;
    }
}

// Запуск функции при загрузке страницы
document.addEventListener('DOMContentLoaded', loadUserData);
