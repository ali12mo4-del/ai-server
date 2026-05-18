const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const conversations = {};

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const sessionId = req.body.sessionId || 'default';

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is empty' });
    }

    if (!conversations[sessionId]) {
        conversations[sessionId] = [
            {
                role: 'system',
                content: 'انت مساعد ذكاء اصطناعي اسمك ChatLux. صنعك Ali Mohammed شاب مصري عمره 18 سنة بيحب الانمي والبرمجة. كن ودود وذكي وارد دايما بالعربي وبسرعة وبإيجاز.'
            }
        ];
    }

    conversations[sessionId].push({ role: 'user', content: userMessage });

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: conversations[sessionId],
                max_tokens: 500
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        conversations[sessionId].push({ role: 'assistant', content: reply });

        res.json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('AI Server Running On Port 3000');
});
