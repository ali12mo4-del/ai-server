const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.GROQ_API_KEY,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: req.body.messages,
        max_tokens: 500,
      }),
    });
    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
