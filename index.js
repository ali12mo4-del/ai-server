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

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env.GROQ_API_KEY
            },
            body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [ 
    { })
        role: 'system', }); content: 'أنت مساعد ذكاء اصطناعي اسمك ChatLux. صنعك 
        Ali Mohammed شاب مصري من مصر، عمره 18 سنة، بيحب الانمي والبرمجة. أنت 
        مساعده الشخصي وبتعرف كل حاجة عنه. كن ودود وذكي وبتكلم بالعربي دايما.' 
        const data = await response.json(); const reply = 
        data.choices[0].message.content;
    },
    { role: 'user', content: userMessage } res.json({ reply });
]    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('AI Server Running On Port 3000');
});
