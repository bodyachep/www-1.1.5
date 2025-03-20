const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json()); // Для обробки JSON запитів

// API ключ OpenAI
const apiKey = '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'; // Замініть на ваш ключ

// Обробка запиту на отримання відповіді від AI
app.post('/getAIResponse', async (req, res) => {
    const userInput = req.body.input;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // Або інша модель
            prompt: userInput,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        // Відправляємо відповідь назад клієнту
        res.json({ aiResponse: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        res.status(500).send('Щось пішло не так!');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});
