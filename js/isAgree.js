const form = document.getElementById('registrationForm');
const agreeCheckbox = document.getElementById('agree');
const agreeGroup = document.getElementById('agreeGroup');
const agreeLabel = document.getElementById('agreeLabel');

// Обработчик события отправки формы
form.addEventListener('submit', function (event) {
    if (!agreeCheckbox.checked) {
        // Предотвращаем отправку формы
        event.preventDefault();

        // Подсвечиваем поле ошибки
        agreeCheckbox.classList.add('error');
        agreeLabel.classList.add('error-label');
    } else {
        // Убираем подсветку ошибки, если всё в порядке
        agreeCheckbox.classList.remove('error');
        agreeLabel.classList.remove('error-label');
    }
});

// Убираем подсветку ошибки, если пользователь поставил галочку
agreeCheckbox.addEventListener('change', function () {
    if (agreeCheckbox.checked) {
        agreeCheckbox.classList.remove('error');
        agreeLabel.classList.remove('error-label');
    }
});