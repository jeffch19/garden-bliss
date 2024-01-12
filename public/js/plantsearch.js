document.addEventListener('DOMContentLoaded', function () {
  const plantSearchInput = document.getElementById('plantSearchInput');
  const plantSearchBtn = document.getElementById('plantSearchBtn');

  plantSearchBtn.addEventListener('click', function () {
    const searchTerm = plantSearchInput.value.trim();
    console.log('Search Term:', searchTerm);

    if (searchTerm !== '') {
      // Make the API call
      searchPlants(searchTerm);
    } else {
      
      alert('Please enter a plant name before searching.');
    }
  });
});

async function searchPlants(searchTerm) {
  try {
    // Make API call
    const response = await fetch(`/api/search?query=${searchTerm}`);
    const data = await response.json();
    console.log('API Response:', data);

    
    updateUI(data);
  } catch (error) {
    console.error('Error:', error);
    // Handle API error 
    alert('An error occurred while fetching plant data.');
  }
}

//update the plant data div
function updateUI(data) {
  
  const plantDataDiv = document.getElementById('plantdata');
  plantDataDiv.innerHTML = `<p>${data.description}</p>`;
  console.log('UI Updated with:', data);
}
