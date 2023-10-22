"use strict";

import { getData,
  submitNewArtist, 
  submitNewSong} from "../crud/rest.js";

window.addEventListener("load", start);

let artists = [];
let albums = [];

async function start() {
  // Get artist names
  fillForms();

  // Submit event for create new artist form.
  document.querySelector("#add-artist-container").addEventListener("submit", async (event) => {
    submitNewArtist(event);
  });

  // Submit event for add song form.
  document.querySelector("#add-track-container").addEventListener("submit", (event) => {
    submitNewSong(event);
  })

  document.querySelector("#add-album-container").addEventListener("submit", (event) => {
    submitNewAlbum(event);
  })



  // Change add view between artist/song (buttons)
  document.querySelector("#change-to-add-artist").addEventListener("click", () => changeAddForm("artist"));
  document.querySelector("#change-to-add-song").addEventListener("click", () => changeAddForm("song"));
  document.querySelector("#change-to-add-album").addEventListener("click", () => changeAddForm("album"));

  function changeAddForm(param) {
    // change active button.
    document.querySelector("#change-to-add-artist").classList.value = "";
    document.querySelector("#change-to-add-song").classList.value = "";
    document.querySelector("#change-to-add-album").classList.value = "";
    document.querySelector(`#change-to-add-${param}`).classList.add("active");

    // change active form.
    document.querySelector("#add-artist-div").classList.value = "hidden";
    document.querySelector("#add-song-div").classList.value = "hidden";
    document.querySelector("#add-album-div").classList.value = "hidden";
    document.querySelector(`#add-${param}-div`).classList.value = "";
  }
}

async function fillForms() {
  artists = await getData("artists");
  albums = await getData("albums");

  for (const artist of artists) {
    let html = /*html*/`
    <option value='${artist.name}'>${artist.name}</option>
    `;

    document.querySelector("#album-form-artist").insertAdjacentHTML("beforeend", html);
  };

  for (const album of albums) {
    let html = /*html*/`
    <option value='${album.title}'>${album.title}</option>
    `;

    document.querySelector("#track-form-album").insertAdjacentHTML("beforeend", html);
  };
  
}