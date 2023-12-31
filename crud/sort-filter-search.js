// Logic is Filter -> Search ->  Sort
//filter in array.

async function sortAnArray(array, filter, search, sort) {
  let filteredArray = filterInArray(array, filter);
  let searchedArray = searchInArray(filteredArray, search);
  let sortedArray = sortArray(searchedArray, sort);
  return sortedArray;
}

function filterInArray(array, filter) {
  if (filter == "all") {
    return array;
  } else {
    return array.filter((obj) => obj.genres.toLowerCase().includes(filter));
  }
}
// search array
function searchInArray(array, searchInput) {
  if (searchInput === "" || searchInput === null) {
    return array;
  } else {
    // Search on both label and name.
    let arr1 = array.filter((obj) => obj.name.toLowerCase().includes(searchInput.toLowerCase()));
    let arr2 = array.filter((obj) => obj.labels.toLowerCase().includes(searchInput.toLowerCase()));
    let arr3 = arr1.concat(arr2);
    return arr3;
  }
}

// Sort array
function sortArray(array, sortType) {
    // Sort by date added
    if (sortType == "default") {
      return array.sort((a, b) => b.id - a.id);
    }
    if (sortType == "default-reversed") {
      console.log("Array has been sorted by ID.");
      return array.sort((a, b) => a.id - b.id);
    }
    // Sort by name
    if (sortType == "name") {
      console.log("Array has been sorted by name.");
      return array.sort((a, b) => a.name.localeCompare(b.name));
      
    }
    if (sortType == "name-reverse") {
      console.log("Array has been sorted by name (reversed).");
      return array.sort((a, b) => b.name.localeCompare(a.name));
      
    }
    // Sort by age
    if (sortType == "age") {
      console.log("Array has been sorted by age.");
      return array.sort((a, b) => a.birthdate.localeCompare(b.birthdate));
      
    }
    if (sortType == "age-reversed") {
      console.log("Array has been sorted by age.");
      return array.sort((a, b) => b.birthdate.localeCompare(a.birthdate));
      
    }
    // Sort by 'Active since'
    if (sortType == "activeSince") {
      console.log("Array has been sorted by 'active since'.");
      return array.sort((a, b) => a.activeSince - b.activeSince);
      
    }

    if (sortType == "activeSince-reversed") {
      console.log("Array has been sorted by 'active since'.");
      return array.sort((a, b) => b.activeSince - a.activeSince);
    }
  
  }

  export {
    sortAnArray
  };