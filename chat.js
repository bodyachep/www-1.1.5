// Функція для додавання повідомлень у чат
const addMessage = (message, isUser = true) => {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    
    messageElement.classList.add('message', isUser ? 'user-message' : 'ai-message');
    messageElement.textContent = message;
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Прокручуємо чат вниз
};

// Функція для відправки повідомлення
const sendMessage = () => {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();
    
    if (userText === "") return;

    addMessage(`🧑‍💻 Ви: ${userText}`, true);
    input.value = "";

    setTimeout(() => {
        const aiResponse = getAIResponse(userText);
        addMessage(`🤖 Бодя AI: ${aiResponse}`, false);
    }, 1000);
};

// Функція для генерації відповіді
const getAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("привіт")) return "Привіт! Як справи? 😊";
    if (lowerInput.includes("як тебе звати")) return "Мене звати Бодя AI! А тебе?";
    if (lowerInput.includes("що ти вмієш")) return "Я можу відповідати на твої запитання та допомагати з кодом!";
    if (lowerInput.includes("до побачення")) return "Бувай! Гарного дня! 👋";

    return "Не зовсім зрозумів, можеш перефразувати? 🤔";
};

// Відправка повідомлення при натисканні Enter
document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});

// Функція для швидких повідомлень
const sendQuickMessage = (message) => {
    document.getElementById("user-input").value = message;
    sendMessage();
};
