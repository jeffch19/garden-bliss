//Main script that ties together garden and api js
import { fetchSpeciesList, fetchSpeciesDetails } from "./api.js";
import { processSpeciesList, processSpeciesDetails } from "./garden.js";

async function main() {
  try {
    //fetch species list
    const speciesListData = await fetchSpeciesList();
    const processedSpeciesList = processSpeciesList(speciesListData);
    console.log('Processed Species List:', processedSpeciesList);

    //species id that will be fetched
    const specificSpeciesId = '';

     // fetch species details
     const speciesDetailsData = await fetchSpeciesDetails(specificSpeciesId);
     const processedSpeciesDetails = processSpeciesDetails(speciesDetailsData);
     console.log('Processed Species Details:', processedSpeciesDetails);
 
     
   } catch (error) {
     console.error('Error:', error);
   }
 }
 
 // Call the main function
 main();
  
