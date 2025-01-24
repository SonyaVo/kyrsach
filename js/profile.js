
async function loadUserData() {
    const resultDiv = document.getElementById('result');
    const vote = document.getElementById('vote');
    try {
       
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

    
        const votesResponse = await fetch('../bek/get_user_votes.php');
        if (!votesResponse.ok) {
            throw new Error(`HTTP error! status: ${votesResponse.status}`);
        }
        const votesData = await votesResponse.json();

        if (votesData.success && Array.isArray(votesData.data)) {
            votesData.data.forEach(church => {
               
                const listItem = document.createElement('li');
                const vote_word = padeg(church.vote_count) ;

                
                listItem.innerHTML = `
                    <h2>${church.название}</h2>
                    <div class="count">
                    <div class="box">
                        <div сlass="in_box" style='width:${church.vote_count * 5}px; background-color: #613A3D;height: 20px;'></div>
                        </div>
                    
                    <h4> ${vote_word} </h4>
                    </div>
                    
                `;
                vote.appendChild(listItem);

            });
        } else {
            resultDiv.innerHTML += `<p class="error">Ошибка: данные голосов не являются массивом.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML += `<p class="error">An error occurred: ${error.message}</p>`;
    }
}


document.addEventListener('DOMContentLoaded', loadUserData);

function padeg(n) {
    let recordWord;
    let recordWord2;
    if (n % 10 === 1 && n % 100 !== 11) {
        recordWord2 = "голос";
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {

        recordWord2 = "голоса";

    } else {

        recordWord2 = "голосов";
    }
    return `${n} ${recordWord2}`;
}
