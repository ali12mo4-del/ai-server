const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: 'Message is empty' });
    }

    const replies = [
        'Hello',
        'How are you?',
        'Sounds good',
        'Tell me what you got',
        'I am a local AI'
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    res.json({ reply: randomReply });
});

app.listen(3000, () => {
    console.log('AI Server Running On Port 3000');
});
