// handles api requests
export async function fetchSpeciesList() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try{
    const response = await fetch('/api/plant/list', requestOptions);

    if (response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function fetchSpeciesDetails(speciesId) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch (`/api/plant/species/${speciesId}`, requestOptions);

    if (!response.ok) {
      throw new Error (`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

}