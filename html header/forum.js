import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, set, get, update } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

// Элементы интерфейса
const newTopicForm = document.getElementById("newTopicForm");
const topicTitleInput = document.getElementById("topicTitle");
const topicDescriptionInput = document.getElementById("topicDescription");
const topicsContainer = document.getElementById("topicsContainer");

// Модальное окно
const newTopicButton = document.getElementById("newTopicButton");
const newTopicModal = document.getElementById("newTopicModal");
const closeModalBtn = document.getElementById("closeModalBtn");

// Кнопка входа
const loginButton = document.getElementById('loginButton'); // Обновление кнопки

// Открытие и закрытие модального окна
newTopicButton.addEventListener("click", () => newTopicModal.style.display = "block");
closeModalBtn.addEventListener("click", () => newTopicModal.style.display = "none");

// Инициализация Firebase Auth
const auth = getAuth();

// Функция обновления кнопки входа
function updateLoginButton(user) {
    if (loginButton) {
        if (user) {
            // Если пользователь авторизован
            loginButton.style.backgroundColor = "green";
            loginButton.style.color = "white";
            loginButton.textContent = user.displayName || user.email.split('@')[0]; // Показываем имя или email
        } else {
            // Если пользователь не авторизован
            loginButton.style.backgroundColor = "";  // Возвращаем стандартный фон
            loginButton.style.color = "";  // Возвращаем стандартный цвет
            loginButton.textContent = "Вхід";  // Текст для неавторизованного пользователя
        }
    }
}

// Слушатель на изменение состояния авторизации
onAuthStateChanged(auth, (user) => {
    updateLoginButton(user); // Обновляем кнопку после входа
});

// Создание новой темы
newTopicForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = topicTitleInput.value.trim();
    const description = topicDescriptionInput.value.trim();
    if (!title || !description) return alert("Заповніть всі поля!");

    const user = auth.currentUser; // Получаем текущего пользователя
    const author = user ? user.displayName || user.email.split('@')[0] : "Користувач"; // Если авторизован, берем его имя

    const newTopic = {
        title,
        description,
        author,
        comments: {},
        likes: 0,
        dislikes: 0
    };

    try {
        const newTopicRef = push(ref(db, 'forum/topics'));
        await set(newTopicRef, newTopic);
        topicTitleInput.value = "";
        topicDescriptionInput.value = "";
        newTopicModal.style.display = "none";
        loadTopics();  // Загружаем темы после создания новой
    } catch (error) {
        alert("Помилка: " + error.message);
    }
});

// Загрузка тем
async function loadTopics() {
    try {
        const topicsSnapshot = await get(ref(db, 'forum/topics'));
        topicsContainer.innerHTML = "";

        if (topicsSnapshot.exists()) {
            const topics = topicsSnapshot.val();
            for (let topicId in topics) {
                const topic = topics[topicId];
                const topicDiv = document.createElement("div");
                topicDiv.classList.add("forum-topic");

                topicDiv.innerHTML = `
                    <h3>${topic.title}</h3>
                    <p>${topic.description}</p>
                    <p><strong>Автор:</strong> ${topic.author}</p>

                    <div class="like-dislike-container">
                        <button class="likeButton" data-id="${topicId}">
                            <i class="fas fa-thumbs-up"></i>👍 ${topic.likes || 0}
                        </button>
                        <button class="dislikeButton" data-id="${topicId}">
                            <i class="fas fa-thumbs-down"></i>👎 ${topic.dislikes || 0}
                        </button>
                    </div>

                    <button class="toggle-comments" data-topic-id="${topicId}">Показати коментарі</button>
                    <div class="comments" id="comments-${topicId}" style="display:none;"></div>

                    <div class="comment-form">
                        <textarea id="comment-text-${topicId}" placeholder="Напишіть коментар..." rows="2"></textarea>
                        <button class="submit-comment" data-topic-id="${topicId}">Добавити коментар</button>
                    </div>
                `;

                topicsContainer.appendChild(topicDiv);

                topicDiv.querySelector(".likeButton").addEventListener("click", () => likeDislikeTopic(topicId, "like"));
                topicDiv.querySelector(".dislikeButton").addEventListener("click", () => likeDislikeTopic(topicId, "dislike"));
                topicDiv.querySelector(".submit-comment").addEventListener("click", () => submitComment(topicId));

                const toggleCommentsButton = topicDiv.querySelector(".toggle-comments");
                toggleCommentsButton.addEventListener("click", () => {
                    const commentsContainer = document.getElementById(`comments-${topicId}`);
                    if (commentsContainer.style.display === "none") {
                        commentsContainer.style.display = "block";
                        toggleCommentsButton.innerText = "Сховати коментарі";
                        loadComments(topicId);
                    } else {
                        commentsContainer.style.display = "none";
                        toggleCommentsButton.innerText = "Показати коментарі";
                    }
                });
            }
        }
    } catch (error) {
        console.error("Помилка при завантаженні тем: ", error);
    }
}

// Лайк/дизлайк темы
async function likeDislikeTopic(topicId, action) {
    const topicRef = ref(db, `forum/topics/${topicId}`);
    const topicSnapshot = await get(topicRef);

    if (topicSnapshot.exists()) {
        const data = topicSnapshot.val();
        const likes = data.likes || 0;
        const dislikes = data.dislikes || 0;

        await update(topicRef, {
            likes: action === "like" ? likes + 1 : likes,
            dislikes: action === "dislike" ? dislikes + 1 : dislikes
        });

        loadTopics();
    }
}

// Загрузка комментариев
async function loadComments(topicId) {
    const commentsContainer = document.getElementById(`comments-${topicId}`);
    commentsContainer.innerHTML = "";

    try {
        const commentsSnapshot = await get(ref(db, `forum/topics/${topicId}/comments`));

        if (commentsSnapshot.exists()) {
            const comments = commentsSnapshot.val();
            for (let commentId in comments) {
                const comment = comments[commentId];
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");

                commentDiv.innerHTML = `
                    <p><strong>${comment.author}</strong>: ${comment.content}</p>
                    <button class="likeButton" data-id="${commentId}" data-topic-id="${topicId}">👍 (${comment.likes || 0})</button>
                    <button class="dislikeButton" data-id="${commentId}" data-topic-id="${topicId}">👎 (${comment.dislikes || 0})</button>
                `;

                commentsContainer.appendChild(commentDiv);

                commentDiv.querySelector(".likeButton").addEventListener("click", () => likeDislikeComment(topicId, commentId, "like"));
                commentDiv.querySelector(".dislikeButton").addEventListener("click", () => likeDislikeComment(topicId, commentId, "dislike"));
            }
        }
    } catch (error) {
        console.error("Помилка при завантаженні коментарів: ", error);
    }
}

// Лайк/дизлайк для комментариев
async function likeDislikeComment(topicId, commentId, action) {
    const commentRef = ref(db, `forum/topics/${topicId}/comments/${commentId}`);
    const commentSnapshot = await get(commentRef);

    if (commentSnapshot.exists()) {
        const data = commentSnapshot.val();
        const likes = data.likes || 0;
        const dislikes = data.dislikes || 0;

        await update(commentRef, {
            likes: action === "like" ? likes + 1 : likes,
            dislikes: action === "dislike" ? dislikes + 1 : dislikes
        });

        loadComments(topicId);
    }
}

// Добавление комментария
async function submitComment(topicId) {
    const commentText = document.getElementById(`comment-text-${topicId}`).value.trim();
    if (!commentText) return alert("Будь ласка, напишіть коментар!");

    const newCommentRef = push(ref(db, `forum/topics/${topicId}/comments`));
    const user = auth.currentUser;
    const author = user ? user.displayName || user.email.split('@')[0] : "Гість";

    const newComment = {
        content: commentText,
        author,
        likes: 0,
        dislikes: 0
    };

    try {
        await set(newCommentRef, newComment);
        document.getElementById(`comment-text-${topicId}`).value = "";  // Очистить поле комментария
        loadComments(topicId);
    } catch (error) {
        alert("Помилка: " + error.message);
    }
}

// Инициализация темы при загрузке страницы
loadTopics();
