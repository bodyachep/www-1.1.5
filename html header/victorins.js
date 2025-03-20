let correctAnswers = 0; // змінна для зберігання правильних відповідей

function showAnswer(button, isCorrect, questionNumber) {
    // Якщо відповідь правильна, збільшуємо лічильник правильних відповідей
    if (isCorrect) {
        correctAnswers++;
        button.style.backgroundColor = 'green'; // підсвічуємо правильну відповідь зеленим
    } else {
        button.style.backgroundColor = 'red'; // підсвічуємо неправильну відповідь червоним
    }

    // Вимикаємо всі кнопки після вибору відповіді
    const buttons = button.closest('.quiz-question').querySelectorAll('.answer-button');
    buttons.forEach(b => b.disabled = true);
}

function showResults() {
    // Виводимо кількість правильних відповідей у alert
    alert("Ви правильно відповіли на " + correctAnswers + " з 10 питань.");
    
    // Після виведення результату скидаємо кількість правильних відповідей
    correctAnswers = 0;

    // Скидаємо кольори кнопок і дозволяємо повторно натискати
    const buttons = document.querySelectorAll('.answer-button');
    buttons.forEach(b => {
        b.disabled = false;
        b.style.backgroundColor = ''; // скидаємо колір
    });
}
