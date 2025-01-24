document.addEventListener('DOMContentLoaded', () => {
    loadFeedBack();

    function loadFeedBack() {
        fetch('../bek/list_feedback.php') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                const feedbackList = document.getElementById('feedback-list');
                feedbackList.innerHTML = ''; 
                if (!data.success) {
                    console.error('Ошибка на сервере:', data.message);
                    return; 
                }
                data.data.forEach(feedback => {
                    const listItem = document.createElement('li');
    
                    listItem.innerHTML = `
                        <h2>${feedback.message}</h2>
                        <div class="answer">
                                <h3>${feedback.answer}</h3>
                        </div>
                    `;

                    feedbackList.appendChild(listItem);
                });
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    }
});