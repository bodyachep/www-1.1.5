// Імпорт необхідних функцій з Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Конфігурація Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiTWtP9WktKvE_WJfiLWXl4sF6GZcYfT0",
    authDomain: "websitecontacts-563ff.firebaseapp.com",
    projectId: "websitecontacts-563ff",
    storageBucket: "websitecontacts-563ff.firebasestorage.app",
    messagingSenderId: "851902778348",
    appId: "1:851902778348:web:6fb9c87a3ab34a3843cec9"
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Отримуємо елементи форми
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const submitButton = document.getElementById("register-submit");
const errorMessageDiv = document.getElementById("error-message"); // Блок для виводу помилок

// Обробка натискання кнопки "Увійти"
submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Зупиняємо стандартне відправлення форми

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Очищення попередніх повідомлень про помилку
    errorMessageDiv.textContent = "";
    errorMessageDiv.style.display = "none";

    // Перевірка формату email
    if (!validateEmail(email)) {
        showError("❌ Будь ласка, введіть правильну електронну адресу.");
        return;
    }

    // Спроба входу
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Успішний вхід
            const user = userCredential.user;
            console.log("✅ User signed in:", user);

            // Редірект на головну сторінку
            window.location.href = "login.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = getErrorMessage(errorCode);
            showError(errorMessage);
            console.log("❌ Error:", errorCode, errorMessage);
        });
});

// Функція для перевірки формату email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Функція для виводу помилки на сторінку
function showError(message) {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = "block";
}

// Функція для отримання тексту помилки за кодом
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case "auth/invalid-credential":
            return "❌ Невірні облікові дані. Перевірте email або пароль.";
        case "auth/user-not-found":
            return "❌ Користувач з таким email не знайдено.";
        case "auth/wrong-password":
            return "❌ Неправильний пароль.";
        case "auth/too-many-requests":
            return "❌ Занадто багато спроб входу. Спробуйте пізніше.";
        default:
            return "❌ Помилка входу. Будь ласка, спробуйте ще раз.";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("errorModal");
    const closeModal = document.getElementById("closeErrorModal");
    const errorMessage = document.getElementById("errorMessage");

    function showError(message) {
        errorMessage.textContent = message;
        modal.style.display = "block";
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("register-submit").addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();

        if (!email || !password) {
            showError("❌ Введіть email та пароль.");
            return;
        }

        import("https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js").then(({ getAuth, createUserWithEmailAndPassword }) => {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log("✅ User registered:", userCredential.user);
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    showError("❌ " + error.message);
                    console.error("Firebase Error:", error);
                });
        }).catch((err) => {
            showError("❌ Помилка завантаження Firebase.");
            console.error("Firebase Import Error:", err);
        });
    });
});
