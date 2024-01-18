/*
const express = require('express');
const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/feedback', (req, res) => {
  const { feedbackText, feedbackUsername } = req.body;
  console.log(`Received feedback from ${feedbackUsername}: ${feedbackText}`);
  res.send('Thank you for your feedback!');
});

app.listen(port, () => {
  console.log(`Feedback app listening at http://localhost:${port}`);
});
*/


// Function to handle the feedback form 
const feedbackFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from form
  const feedbackText = document.querySelector('#feedbackText').value.trim();
  const feedbackUsername = document.querySelector('#feedbackUsername').value.trim();

  if (feedbackText = true) {
    // Send a POST request to the API endpoint for user login
    const response = await fetch('/api/tips', {
      method: 'POST',
      body: JSON.stringify({ feedbackText, feedbackUsername }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the plant care page
      document.location.replace('/feedback');
    } else {
      const responseData = await response.json();
      alert(responseData.message || 'Feedback posting failed.');
    }
  }
};

document.querySelector('.feedback-form').addEventListener('submit', feedbackFormHandler);