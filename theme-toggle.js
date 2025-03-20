// Получаем переключатель
const themeToggle = document.getElementById('theme-toggle');

// Проверяем сохранённую тему при загрузке страницы
window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        themeToggle.checked = true; // Включаем ползунок
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false; // Выключаем ползунок
    }
};

// Обработчик события для изменения темы
themeToggle.addEventListener('change', function () {
    if (themeToggle.checked) {
        // Включаем тёмную тему
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        // Включаем светлую тему
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});
