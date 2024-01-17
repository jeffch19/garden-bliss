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
    // try {
    //     const response = await fetch(`'/plantsearchresults/${searchTerm}'`);
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     if (data && data.length > 0) {
    //         updateUI(data[0]);
    //     } else {
    //         showError('No data found for this plant.');
    //     }
    // } catch (error) {
    //     showError('An error occurred while fetching plant data.');
    // }
}

// Function to update the UI with plant data

  function updateUI(data) {
    plantDataDiv.innerHTML = `
      <h2>${data.common_name}</h2>
      <p><strong>Scientific Name:</strong> ${data.scientific_name.join(', ')}</p>
      <p><strong>Family:</strong> ${data.family}</p>
      <p><strong>Origin:</strong> ${data.origin.join(', ')}</p>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Dimensions:</strong> ${data.dimension}</p>
      <p><strong>Cycle:</strong> ${data.cycle}</p>
      <p><strong>Propagation:</strong> ${data.propagation.join(', ')}</p>
      <p><strong>Hardiness:</strong> ${data.hardiness.min} to ${data.hardiness.max}</p>
      <p><strong>Watering:</strong> ${data.watering}</p>
      
    
      
      <p><strong>Description:</strong> ${data.description}</p>
  
      <p><strong>Plant Image:</strong></p>
      <img src="${data.default_image.regular_url}" alt="Plant Image">
  
      <p><strong>Additional Images:</strong></p>
      ${data.other_images ? `<p>${data.other_images}</p>` : '<p>No additional images available</p>'}
  
      <p><strong>For more care guides, visit:</strong> <a href="${data['care-guides']}" target="_blank">Care Guides</a></p>
    `;
  }
  


// Function to show error modal
function showError(message) {
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorModal.style.display = 'block';
}

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

// Function to add a search term to the UI
function addSearchTermToUI(term) {
    const termDiv = document.createElement('div');
    termDiv.textContent = term;
    savedSearchListElement.appendChild(termDiv);
}

// Function to clear saved searches from local storage and the UI
function clearSavedSearches() {
    localStorage.removeItem('savedPlantSearches');
    savedSearchListElement.innerHTML = '';
}
