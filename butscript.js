// Кнопка "Вернутися наверх"
const scrollTopButton = document.getElementById("scrollTopButton");
const shareButton = document.getElementById("shareButton");
const voteButton = document.getElementById("voteButton");

// Показуємо/ховаємо кнопку "Вернутися наверх" при прокручуванні сторінки
window.onscroll = function() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        scrollTopButton.style.display = "block"; // Показуємо кнопку
    } else {
        scrollTopButton.style.display = "none"; // Ховаємо кнопку
    }
};

// Функція для прокручування до верху сторінки
scrollTopButton.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Плавна прокрутка
    });
};

// Приклад функціоналу для кнопки "Поділитися"
shareButton.onclick = function() {
    // Текст для поділитися
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("URL скопійовано до буфера обміну!");
    }).catch(err => {
        alert("Помилка при копіюванні URL: " + err);
    });
};

// Приклад функціоналу для кнопки "Голосувати"
voteButton.onclick = function() {
    alert("Ваша голос було враховано! Дякуємо за участь!");
};

// Дизайн кнопки Бодя AI
const bodiaButton = document.querySelector(".bodia-ai-button");
if (bodiaButton) {
    bodiaButton.style.backgroundColor = "red";
    bodiaButton.style.color = "white";
    bodiaButton.style.fontWeight = "bold";
    bodiaButton.style.padding = "10px 20px";
    bodiaButton.style.borderRadius = "5px";
    bodiaButton.style.cursor = "pointer";
    bodiaButton.style.transition = "0.3s";

    bodiaButton.addEventListener("mouseover", () => {
        bodiaButton.style.backgroundColor = "darkred";
    });

    bodiaButton.addEventListener("mouseout", () => {
        bodiaButton.style.backgroundColor = "red";
    });
}

// Стилізація футера
const footer = document.querySelector("footer");
if (footer) {
    footer.style.background = "linear-gradient(45deg, #333, #666)";
    footer.style.color = "white";
    footer.style.padding = "15px";
    footer.style.textAlign = "center";
}


// Слушатель события для отправки формы коментариев
document.getElementById('contact-feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Останавливаем стандартное поведение формы (перезагрузка страницы)
    
    // Получаем значения из полей формы
    const name = document.getElementById('contact-name').value.trim();
    const comment = document.getElementById('contact-comment').value.trim();
    
    // Проверка на пустые поля
    if (name === '' || comment === '') {
        displayStatus('Будь ласка, заповніть усі поля.', 'red');
        return; // Прерываем выполнение, если есть пустые поля
    }
    
    // Тут можно добавить логику для отправки данных на сервер
    // Например, с использованием Fetch API или AJAX
    // Для простоты, выводим сообщение об успешной отправке.

    // Показываем статус отправки
    displayStatus('Дякуємо за відгук! Ваше повідомлення надіслано.', 'green');
    
    // Очистим поля формы после отправки
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-comment').value = '';
});

// Функция для отображения статуса отправки
function displayStatus(message, color) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    statusElement.style.color = color;
    statusElement.style.visibility = 'visible'; // Показываем сообщение
    setTimeout(() => {
        statusElement.style.visibility = 'hidden'; // Скрываем сообщение через 3 секунды
    }, 3000);
}

// Функция для прокрутки страницы наверх
document.getElementById('scrollTopButton').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Функция для кнопки "Поделиться"
document.getElementById('shareButton').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        }).catch(error => console.log('Ошибка при попытке поделиться:', error));
    } else {
        alert('Ваш браузер не поддерживает функцию "Поделиться"');
    }
});
// Ждём загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
    // Автоматическое обновление версии в бегущей строке
    const versionElement = document.getElementById("version");
    if (versionElement) {
        versionElement.textContent = "1.1.5"; // Укажи актуальную версию здесь
    }

    // Найдем элемент с классом "marquee"
    const marquee = document.querySelector(".marquee");

    // Если элемент найден, запускаем анимацию
    if (marquee) {
        // Дублируем текст, чтобы создать бесконечный эффект
        marquee.innerHTML += " — " + marquee.innerHTML;

        let position = 0;
        const speed = 2; // Скорость движения (чем больше число, тем быстрее)

        function animateMarquee() {
            position -= speed;
            if (position < -marquee.scrollWidth / 2) {
                position = 0; // Сбрасываем позицию для бесконечной анимации
            }
            marquee.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animateMarquee);
        }

        // Запускаем анимацию
        animateMarquee();
    }
});
