document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registrationForm');
    const messageContainer = document.getElementById('messageContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(form);

        fetch('../bek/toSignIN.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            messageContainer.innerHTML = `<p>${data.message}</p>`;
            if (data.success) {
                
                form.style.display = 'none';
                messageContainer.innerHTML += `<p сlass="avt"><a href="log_in.php">Авторизация</a></p>`; 
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            messageContainer.innerHTML = `<p>Произошла ошибка. Пожалуйста, попробуйте позже.</p>`;
        });
    });
});
