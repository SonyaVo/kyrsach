
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('loginForm');
    const messageContainer = document.getElementById('messageContainer');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(form);

        fetch('../bek/toLogIn.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
          
            messageContainer.innerHTML = `<p>${data.message}</p>`;
            if (data.success) {
                window.location.href = 'main.php';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            messageContainer.innerHTML = `<p>Произошла ошибка. Пожалуйста, попробуйте позже.</p>`;
        });
    });
});
