const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/feedback', (req, res) => {
  const { feedbackText, feedbackUsername } = req.body;
  console.log(`Received feedback from ${feedbackUsername}: ${feedbackText}`);
  res.send('Thank you for your feedback!');
});

app.listen(port, () => {
  console.log(`Feedback app listening at http://localhost:${port}`);
});