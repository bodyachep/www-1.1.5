// Импорт Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiTWtP9WktKvE_WJfiLWXl4sF6GZcYfT0",
    authDomain: "websitecontacts-563ff.firebaseapp.com",
    databaseURL: "https://websitecontacts-563ff-default-rtdb.firebaseio.com/",
    projectId: "websitecontacts-563ff",
    storageBucket: "websitecontacts-563ff.appspot.com",
    messagingSenderId: "851902778348",
    appId: "1:851902778348:web:6fb9c87a3ab34a3843cec9"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Получаем элементы формы
const nameInput = document.getElementById("contact-name");
const commentInput = document.getElementById("contact-comment");
const submitButton = document.getElementById("contact-submit");
const statusMessage = document.getElementById("status");
const loginButton = document.getElementById("loginButton"); // Кнопка входа в хедере

// Проверяем, есть ли сохранённый пользователь (сессия)
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
        updateLoginButton(JSON.parse(savedUser));
    }
});

// Функция обновления кнопки входа
function updateLoginButton(user) {
    if (loginButton) {
        loginButton.style.backgroundColor = "green";
        loginButton.style.color = "white";
        loginButton.textContent = user.name;
    }
}

// Обработчик клика по кнопке
submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (name === "" || comment === "") {
        statusMessage.textContent = "Заповніть всі поля!";
        statusMessage.style.color = "red";
        return;
    }

    // Генерируем уникальный ключ и записываем данные
    const newCommentRef = push(ref(db, "comments"));
    set(newCommentRef, {
        name: name,
        comment: comment
    })
    .then(() => {
        statusMessage.textContent = "Коментар збережено!";
        statusMessage.style.color = "green";
        nameInput.value = "";
        commentInput.value = "";
    })
    .catch((error) => {
        statusMessage.textContent = "Помилка: " + error.message;
        statusMessage.style.color = "red";
    });
});
