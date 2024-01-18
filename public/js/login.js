// Function to handle the login form submission
const loginFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    try {
      // Send a POST request to the API endpoint for user login
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the server response is successful (status code 200-299)
      if (response.ok) {
        // If successful, redirect the browser to the plant care page
        document.location.replace('/');
      } else {
        // If there's an error, parse the response JSON
        const responseData = await response.json();
        // Display error messages to the user using an alert
        alert(responseData.message || 'Login failed.');
      }
    } catch (error) {
      // Catch any unexpected errors during the fetch operation
      console.error('Error during login:', error);
    }
  }
};

// Add an event listener to the login form for form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
           