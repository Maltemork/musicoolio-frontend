import { displayArtists } from "./frontend.js";



// Logic is Filter -> Search ->  Sort
//filter in array.
export function filterInArray(array) {
  let filter = document.querySelector("#filterArtists").value;

  if (filter == "all") {
    searchInArray(array);
  } else {
    let filteredArray = array.filter((obj) => obj.genres.toLowerCase().includes(filter));
    searchInArray(filteredArray);
  }
}
// search array
function searchInArray(array) {
  let searchInput = document.querySelector("#searchField").value.toLowerCase();
  let filteredArray = array.filter((obj) => obj.name.toLowerCase().includes(searchInput));
  if (searchInput === 0) {
    sortArray(array);
  } else {
    sortArray(filteredArray);
  }
}

// Sort array
function sortArray(array) {

    const sortType = document.querySelector("#sortBy").value;
  
    // Sort by date added
    if (sortType == "default") {
      displayArtists(array.sort((a, b) => b.id - a.id));
      console.log("Array has been sorted by ID.");
    }
    if (sortType == "default-reversed") {
      displayArtists(array.sort((a, b) => a.id - b.id));
      console.log("Array has been sorted by ID.");
    }
    // Sort by name
    if (sortType == "name") {
      displayArtists(array.sort((a, b) => a.name.localeCompare(b.name)));
      console.log("Array has been sorted by name.");
    }
    if (sortType == "name-reverse") {
      displayArtists(array.sort((a, b) => b.name.localeCompare(a.name)));
      console.log("Array has been sorted by name (reversed).");
    }
    // Sort by age
    if (sortType == "age") {
      displayArtists(array.sort((a, b) => a.birthdate.localeCompare(b.birthdate)));
      console.log("Array has been sorted by age.");
    }
    if (sortType == "age-reversed") {
      displayArtists(array.sort((a, b) => b.birthdate.localeCompare(a.birthdate)));
      console.log("Array has been sorted by age.");
    }
    // Sort by 'Active since'
    if (sortType == "activeSince") {
      displayArtists(array.sort((a, b) => a.activeSince - b.activeSince));
      console.log("Array has been sorted by 'active since'.");
    }

    if (sortType == "activeSince-reversed") {
      displayArtists(array.sort((a, b) => b.activeSince - a.activeSince));
      console.log("Array has been sorted by 'active since'.");
    }
  
  }