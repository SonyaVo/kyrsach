document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const formData = new FormData(this); // Получаем данные формы

    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Отображаем сообщение об успешной отправке
        document.getElementById('responseMessage').innerText = data;
        document.getElementById('responseMessage').style.display = 'block';
        // this.reset(); // Сбрасываем форму
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});