document.addEventListener("DOMContentLoaded", function () {
    const newsDateElement = document.querySelector(".news-date span");

    if (newsDateElement) {
        let storedDate = localStorage.getItem("newsDate");

        // Если дата не сохранена, установим текущую и сохраним
        if (!storedDate) {
            const today = new Date().toLocaleDateString("uk-UA", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
            localStorage.setItem("newsDate", today);
            storedDate = today;
        }

        // Вставляем дату в HTML
        newsDateElement.textContent = storedDate;
    }
});
