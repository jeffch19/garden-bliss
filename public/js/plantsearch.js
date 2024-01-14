// Event listener to handle DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
  const plantSearchInput = document.getElementById('plantSearchInput');
  const plantSearchBtn = document.getElementById('plantSearchBtn');
  const savedSearchesContainer = document.getElementById('savedSearches');
  const errorModal = document.getElementById('errorModal');
  
    // Load saved plant searches from local storage when the page loads
    loadSavedSearches();
  
    // Event listener for the search button click
    plantSearchBtn.addEventListener('click', function () {
      const searchTerm = plantSearchInput.value.trim();
      if (searchTerm !== '') {
        searchPlants(searchTerm);
        saveSearchTerm(searchTerm);
        addSearchTermToUI(searchTerm);
      } else {
        alert('Please enter a plant name before searching.');
      }
    });
  });
  
  // Function to search plants using an API call
  async function searchPlants(searchTerm) {
    try {
      const response = await fetch(`/api/species-list?query=${searchTerm}`);
      const data = await response.json();
      if (data && data.length > 0) {
        updateUI(data[0]);
      } else {
        showError('No data found for this plant.');
        // Show placeholders if no data is found
        showPlaceholders();
      }
    } catch (error) {
      showError('An error occurred while fetching plant data.');
      // Show placeholders in case of error
      showPlaceholders();
    }
  }
  
  // Function to update the UI with plant data
  function updateUI(data) {
    const plantDataDiv = document.getElementById('plantData');
    const plantImage = document.getElementById('plantImage');
    
    // Update plant data and hide placeholder
    plantDataDiv.textContent = data.description || '';
    document.getElementById('plantDataPlaceholder').style.display = 'none';
    
    // Update plant image and hide placeholder
    plantImage.src = data.image_link || 'path_to_default_image.jpg';
    document.getElementById('plantImagePlaceholder').style.display = 'none';
  }
  
  // Function to show error modal
  function showError(message) {
    const errorText = document.getElementById('errorText'); // Assuming you have an element to show error text
    errorText.textContent = message;
    errorModal.style.display = 'block'; // Show error modal
  }
  
  // Function to save the search term to local storage
  function saveSearchTerm(searchTerm) {
    let savedSearches = JSON.parse(localStorage.getItem('savedPlantSearches')) || [];
    savedSearches.push(searchTerm);
    if (savedSearches.length > 10) { // Limit to 10 saved searches
      savedSearches.shift();
    }
    localStorage.setItem('savedPlantSearches', JSON.stringify(savedSearches));
  }
  
  // Function to load saved searches from local storage and display them
  function loadSavedSearches() {
    let savedSearches = JSON.parse(localStorage.getItem('savedPlantSearches')) || [];
    if (savedSearches.length > 0) {
      savedSearches.forEach(term => {
        addSearchTermToUI(term);
      });
      document.getElementById('savedSearchesPlaceholder').style.display = 'none';
    } else {
      document.getElementById('savedSearchesPlaceholder').style.display = 'block';
    }
  }
  
  // Function to add a search term to the UI
  function addSearchTermToUI(term) {
    const termDiv = document.createElement('div');
    termDiv.textContent = term;
    savedSearchesContainer.appendChild(termDiv);
    
    // Hide the placeholder as we now have saved searches
    document.getElementById('savedSearchesPlaceholder').style.display = 'none';
  }
  
  // Function to show placeholders
  function showPlaceholders() {
    document.getElementById('plantDataPlaceholder').style.display = 'block';
    document.getElementById('plantImagePlaceholder').style.display = 'block';
  }
  