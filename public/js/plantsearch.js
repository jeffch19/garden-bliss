    const plantSearchInput = document.querySelector('.plantSearchInput input');
    const plantSearchBtn = document.getElementById('plantSearchBtn');
    const savedSearchListElement = document.querySelector('.savedSearchList');
    const deletePlantsBtn = document.getElementById('deletePlantsBtn');
    const errorModal = document.getElementById('errorModal');

    // Load saved plant searches from local storage when the page loads
    loadSavedSearches();

    // Add event listener for the search button click
    plantSearchBtn.addEventListener('click', function () {
        let searchTerm = plantSearchInput.value.trim();
        if (searchTerm !== '') {
            searchPlants(searchTerm);
            saveSearchTerm(searchTerm);
            addSearchTermToUI(searchTerm);
        } else {
            alert('Please enter a plant name before searching.');
        }
    });

    // Add event listener for the delete button click
    deletePlantsBtn.addEventListener('click', function () {
        clearSavedSearches();
    });
//});

// Function to search plants using an API call
async function searchPlants(searchTerm) {
  window.location = `/plantsearchresults/${searchTerm}`
}
 
// Function to show error modal
function showError(message) {
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorModal.style.display = 'block';
}

// Add event listener for the Enter key press in the search input
plantSearchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Get the search term from the input field
      let searchTerm = this.value.trim();
      if (searchTerm !== '') {
          searchPlants(searchTerm);
          saveSearchTerm(searchTerm);
          addSearchTermToUI(searchTerm);
      } else {
          alert('Please enter a plant name before searching.');
      }
    }
  });

// Function to save the search term to local storage
function saveSearchTerm(searchTerm) {
    let savedSearchList = JSON.parse(localStorage.getItem('savedPlantSearches')) || [];
    savedSearchList.push(searchTerm);
    if (savedSearchList.length > 10) {
        savedSearchList.shift();
    }
    localStorage.setItem('savedPlantSearches', JSON.stringify(savedSearchList));
}

// Function to load saved searches from local storage and display them
function loadSavedSearches() {
    let savedSearchList = JSON.parse(localStorage.getItem('savedPlantSearches')) || [];
    savedSearchListElement.innerHTML = '';
    savedSearchList.forEach(term => {
        addSearchTermToUI(term);
    });
}

// Function to add a search term to the UI and re-execute the search when clicked
function addSearchTermToUI(term) {
    const termDiv = document.createElement('div');
    termDiv.textContent = term;
    termDiv.classList.add('clickable-term');
    termDiv.onclick = function() {
        searchPlants(term);//Re-execute search for the clicked term
    };
    savedSearchListElement.appendChild(termDiv);
}

// Function to clear saved searches from local storage and the UI
function clearSavedSearches() {
    localStorage.removeItem('savedPlantSearches');
    savedSearchListElement.innerHTML = '';
}
