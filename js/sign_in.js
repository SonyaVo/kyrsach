document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    const messageContainer = document.getElementById('messageContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        const formData = new FormData(form);

        fetch('../bek/toSignIN.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Обновляем содержимое сообщения
            messageContainer.innerHTML = `<p>${data.message}</p>`;
            if (data.success) {
                // Если регистрация успешна, скрываем форму и показываем ссылку на авторизацию
                form.style.display = 'none'; // Скрываем форму
                messageContainer.innerHTML += `<p сlass="avt"><a href="log_in.php">Авторизация</a></p>`; // Добавляем ссылку
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            messageContainer.innerHTML = `<p>Произошла ошибка. Пожалуйста, попробуйте позже.</p>`;
        });
    });
});
