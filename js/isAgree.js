const form = document.getElementById('registrationForm');
const agreeCheckbox = document.getElementById('agree');
const agreeGroup = document.getElementById('agreeGroup');
const agreeLabel = document.getElementById('agreeLabel');

form.addEventListener('submit', function (event) {
    if (!agreeCheckbox.checked) {
        // Предотвращаем отправку формы
        event.preventDefault();

      
        agreeCheckbox.classList.add('error');
        agreeLabel.classList.add('error-label');
    } else {

        agreeCheckbox.classList.remove('error');
        agreeLabel.classList.remove('error-label');
    }
});


agreeCheckbox.addEventListener('change', function () {
    if (agreeCheckbox.checked) {
        agreeCheckbox.classList.remove('error');
        agreeLabel.classList.remove('error-label');
    }
});