import { getArtists } from "./rest.js";
import { filterInArray } from "./sort-filter-search.js";
import { displayArtist, changeView } from "./display.js";
import { startEventListeners, changeGridViewClicked } from "./event-handlers.js";

let previousArtistObject;
let artistsArray = [];
let favoritesArray = [];
let listView = false;

window.addEventListener("load", startFunction);

async function startFunction() {
  console.log("Javascript is runnning");

  artistsArray = await getArtists();
  // Diplay artists
  filterInArray(artistsArray);
  fillFavoritesArray(artistsArray);
  // starts event listeners
  startEventListeners();

  document
    .querySelector("#filterArtist")
    .addEventListener("change", () => filterInArray(artistsArray));
  document
    .querySelector("#sortBy")
    .addEventListener("change", () => filterInArray(artistsArray));
  document
    .querySelector("#searchField")
    .addEventListener("input", () => filterInArray(artistsArray));
}