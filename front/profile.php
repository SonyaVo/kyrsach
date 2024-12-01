<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .user-info {
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            max-width: 400px;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Your Profile</h1>
    <div id="result">Loading...</div>
   

    <script>
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
                            <p><strong>ID:</strong> ${user.id}</p>
                            <p><strong>Name:</strong> ${user.name}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            <p><strong>Age:</strong> ${user.age}</p>

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
    </script>
    <a href="../bek/log_out.php" class="logout-link">Log Out</a>


    
</body>
</html>
