
// // Обработчик клика на кнопку голосования
// const voteButton = document.getElementById('voteButton');
// if (voteButton) {
//     voteButton.addEventListener('click', () => {
//         console.log('Голосование начато для ID храма:', ssId);
//         fetch('../bek/voting.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: `id_temple=${encodeURIComponent(ssId)}`
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Сеть ответила с ошибкой: ' + response.status);
//             }
//             return response.json(); // Парсим ответ как JSON
//         })
//         .then(data => {
//             console.log('Ответ от сервера:', data); // Логируем ответ от сервера
//             if (data.success) {
//                 alert(data.message); // Показываем сообщение об успешном голосовании
//                 const successMessage = document.createElement('p');
//                 successMessage.textContent = 'Ваш голос успешно учтен!';
//                 modalContent.appendChild(successMessage); // Добавляем сообщение в модальное окно
//                 voteButton.remove(); // Удаляем кнопку голосования
//             } else {
//                 alert(data.message); // Показываем сообщение об ошибке
//             }
//         })
//         .catch(err => {
//             console.error('Ошибка при голосовании:', err);
//             alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
//         });
//     });
// }





// modalContent.addEventListener('click', (event) => {
//     // Проверяем, что кликнули именно на кнопку голосования
//     if (event.target.id === 'voteButton') {
//         console.log('Кнопка голосования нажата. ID храма:', ssId);

//         // Проверяем, что ssId установлен
//         if (!ssId) {
//             console.error('ID храма не установлен.');
//             alert('Произошла ошибка: ID храма не установлен.');
//             return;
//         }

//         fetch('../bek/voting.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: `id_temple=${encodeURIComponent(ssId)}`
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Сеть ответила с ошибкой: ' + response.status);
//             }
//             return response.json(); // Парсим ответ как JSON
//         })
//         .then(data => {
//             console.log('Ответ от сервера:', data); // Логируем ответ от сервера
//             if (data.success) {
//                 alert(data.message);
//                 const voteButton = document.getElementById('voteButton');
//                 if (voteButton) {
//                     voteButton.remove(); // Удаляем кнопку голосования
//                 }
//                 const successMessage = document.createElement('p');
//                 successMessage.textContent = 'Ваш голос успешно учтен!';
//                 modalContent.appendChild(successMessage);
//             } else {
//                 alert(data.message);
//             }
//         })
//         .catch(err => {
//             console.error('Ошибка при голосовании:', err);
//             alert('Произошла ошибка при голосовании. Пожалуйста, попробуйте еще раз.');
//         });
//     }
// });
