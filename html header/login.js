// Импорт функций Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCiTWtP9WktKvE_WJfiLWXl4sF6GZcYfT0",
    authDomain: "websitecontacts-563ff.firebaseapp.com",
    projectId: "websitecontacts-563ff",
    storageBucket: "websitecontacts-563ff.firebasestorage.app",
    messagingSenderId: "851902778348",
    appId: "1:851902778348:web:6fb9c87a3ab34a3843cec9"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Элементы страницы
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');
const googleSignInButton = document.querySelector('.g-signin2');
const loadingIndicator = document.getElementById('loading');
const loginButton = document.getElementById('loginButton'); // Кнопка входа в хедере

// Проверяем, есть ли сохранённый пользователь (сессия)
document.addEventListener("DOMContentLoaded", () => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
        updateLoginButton(JSON.parse(savedUser));
    }
});

// Функция входа через email
submitButton?.addEventListener("click", function(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!validateEmail(email)) {
        alert("Будь ласка, введіть правильну електронну адресу.");
        return;
    }

    loadingIndicator.style.display = 'block';

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in:', user);

            // Сохраняем пользователя в sessionStorage
            sessionStorage.setItem("user", JSON.stringify({ name: user.displayName || user.email.split('@')[0] }));

            loadingIndicator.style.display = 'none';
            updateLoginButton(user);

            setTimeout(() => {
                window.location.href = "../index.html";
            }, 2000);
        })
        .catch((error) => {
            loadingIndicator.style.display = 'none';

            if (error.code === 'auth/invalid-credential') {
                alert("Невірні облікові дані.");
            } else {
                alert("Помилка входу: " + error.message);
            }
        });
});

// Функция входа через Google
googleSignInButton?.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log('Google User signed in:', result.user);

            // Сохраняем пользователя в sessionStorage
            sessionStorage.setItem("user", JSON.stringify({ name: result.user.displayName }));

            updateLoginButton(result.user);
            window.location.href = "../index.html";
        })
        .catch((error) => {
            console.log("Google Sign-In Error:", error.message);
        });
});

// Функция обновления кнопки входа
function updateLoginButton(user) {
    if (loginButton) {
        loginButton.style.backgroundColor = "green";
        loginButton.style.color = "white";
        loginButton.textContent = user.name;

        // Добавляем обработчик для выхода
        loginButton.addEventListener('click', () => {
            // Проверяем, авторизован ли пользователь
            const savedUser = sessionStorage.getItem("user");
            if (savedUser) {
                const confirmExit = window.confirm('Ви впевнені, що хочете вийти?');
                if (confirmExit) {
                    signOut(auth).then(() => {
                        // Удаляем информацию о пользователе из sessionStorage
                        sessionStorage.removeItem("user");
                        
                        // Обновляем кнопку входа
                        loginButton.style.backgroundColor = "";
                        loginButton.style.color = "";
                        loginButton.textContent = 'Вхід';

                        // Перенаправляем на страницу входа
                        window.location.href = "../index.html";
                    }).catch((error) => {
                        console.log('Error during sign out:', error.message);
                    });
                }
            } else {
                window.location.href = "login.html"; // Если нет сохранённого пользователя, просто редиректим на страницу входа
            }
        });
    }
}

// Функция валидации email
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}
