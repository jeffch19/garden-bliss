// Get the logout link element by its ID
const logoutLink = document.getElementById('logoutLink');
console.log(logoutLink);

// Add an event listener to the logout link for click events
logoutLink.addEventListener('click', async function (event) {
  // Prevent the default behavior of the link
  event.preventDefault();

  try {
    // Send a request to the backend's logout endpoint using the fetch API
    const response = await fetch('/api/logout', {
      method: 'POST', // Use the appropriate HTTP method based on your server route configuration
    });

    // Check if the response from the server is successful (status code 200)
    if (response.status === 200) {
      // Successfully logged out, perform any necessary UI updates
      window.location.href = '/home'; // Redirect to the homepage
    } else {
      // Handle error cases by logging the error to the console
      console.error('Logout failed:', response.statusText);
    }
  } catch (error) {
    // Catch any unexpected errors during the logout process and log them to the console
    console.error('Error during logout:', error);
  }
});
