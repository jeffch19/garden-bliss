// Function to handle the signup form submission
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const username = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && email && password) {
      // Send a POST request to the API endpoint for user registration
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the login page
        document.location.replace('/login');
      } else {
        // Handle errors or display error messages to the user
        const responseData = await response.json();
        alert(responseData.message || 'Signup failed.');
      }
    }
  };
  
  // Add an event listener to the signup form for form submission
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  