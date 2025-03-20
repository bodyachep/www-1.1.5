import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Получаем кнопку входа
const loginButton = document.getElementById('loginButton'); 

// Функция выхода из аккаунта
function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        alert("Ви вийшли з акаунту!");
        location.reload(); // Перезагружаем страницу после выхода
    }).catch((error) => {
        console.error("Помилка при виході:", error);
    });
}

// Проверяем, авторизован ли пользователь, и обновляем кнопку
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginButton.textContent = user.displayName || "Вийти";
        loginButton.style.backgroundColor = "green";
        loginButton.addEventListener("click", logout);
    } else {
        loginButton.textContent = "Вхід";
        loginButton.style.backgroundColor = "";
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const auth = getAuth();
    const loginButton = document.getElementById('loginButton');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginButton.textContent = user.displayName || user.email.split('@')[0];
            loginButton.onclick = logout;
        } else {
            loginButton.textContent = "Вхід";
            loginButton.onclick = () => window.location.href = "login.html";
        }
    });

    function logout() {
        signOut(auth).then(() => {
            alert("Ви вийшли з акаунту!");
            window.location.reload();
        }).catch((error) => {
            console.error("Помилка при виході: ", error);
        });
    }
});
