// Function to handle the login form submission
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint for user login
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the plant care page
        document.location.replace('/forum');
      } else {
        // Handle errors or display error messages to the user
        const responseData = await response.json();
        alert(responseData.message || 'Login failed.');
      }
    }
  };
  
  // Add an event listener to the login form for form submission
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  