"use strict";

import {
    getArtists,
    updateArtist,
    submitNewArtist,
    deleteArtist,
    editArtist,
    getRandomArtist,
    submitNewSong
} from "./rest.js";
import { filterInArray } from "./sort-filter-search.js";

let previousArtistObject;
let artistsArray = [];
let favoritesArray = [];
let listView = false;


window.addEventListener("load", startFunction);

async function startFunction() {
    // eventlisteners
    console.log("Javascript is running 👍");

    

    artistsArray = await getArtists();

    // Diplay artists
    filterInArray(artistsArray);

    // Fills favorites array based on artist.favorite value.
    fillFavoritesArray(artistsArray);

    // starts event listeners
    startEventListeners();

    document.querySelector("#filterArtists").addEventListener("change", () => {filterInArray(artistsArray)})

    document.querySelector("#sortBy").addEventListener("change", () => {filterInArray(artistsArray);});

    document.querySelector("#searchField").addEventListener("input", () => {filterInArray(artistsArray)});
}

function startEventListeners() {
    // Navigation buttons in the header.'
    // Artists (frontpage)
    document.querySelector("#nav-frontpage").addEventListener("click", async function() { 
        artistsArray = await getArtists();
        filterInArray(artistsArray); 
        changeView("frontpage");});
    // music page
    document.querySelector("#nav-music").addEventListener("click", () => changeView("music"));

    // add page
    document.querySelector("#nav-create").addEventListener("click", () => { changeView("create"); });

    // random page
    document.querySelector("#nav-random").addEventListener("click", async () => { 
        await randomArtistViewClicked();
        changeView("random"); });
    
    // favorites page
    document.querySelector("#nav-favorites").addEventListener("click", async() => { 
        artistsArray = await getArtists(); 
        fillFavoritesArray(artistsArray); 
        changeView("favorites"); });

    // Submit event for create new artist form.
    document.querySelector("#form-container").addEventListener("submit", (event) => {
        submitNewArtist(event);
    });

    // Submit event for add song form.
    document.querySelector("#add-song-container").addEventListener("submit", (event) => {
        submitNewSong(event);
    })

    // Change add view between artist/song (buttons)
    document.querySelector("#change-to-add-artist").addEventListener("click", () => changeAddForm("artist"));
    document.querySelector("#change-to-add-song").addEventListener("click", () => changeAddForm("song"));

    function changeAddForm(param) {
        // change active button.
        document.querySelector("#change-to-add-artist").classList.value = "";
        document.querySelector("#change-to-add-song").classList.value = "";
        document.querySelector(`#change-to-add-${param}`).classList.add("active");

        // change active form.
        document.querySelector("#add-artist-div").classList.value = "hidden";
        document.querySelector("#add-song-div").classList.value = "hidden";
        document.querySelector(`#add-${param}-div`).classList.value = "";
    }

    // Eventlistener for NO button in delete dialog.
    document.querySelector("#btn-no").addEventListener("click", () => {
        document.querySelector("#dialog-delete-artist").close();});

    // Close delete dialog
    document.querySelector("#close-delete-button").addEventListener("click", () => {
        document.querySelector("#dialog-delete-artist").close();});
    
    // Close edit dialog
    document.querySelector("#close-edit-button").addEventListener("click", () => {
        document.querySelector("#edit-artist-dialog").close();});

    
    // load new random artist
    document.querySelector("#new-random-artist-btn").addEventListener("click", randomArtistViewClicked);

    // LIST VIEW / GRID VIEW button
    document.querySelector("#change-grid-btn").addEventListener("click", changeGridViewClicked);
    
}

function changeView(section) {
    console.log(`Changed view to ${section}.`);
    // Hide all sections
    document.querySelector("#random-section").classList.value = "hidden";
    document.querySelector("#frontpage-section").classList.value = "hidden";
    document.querySelector("#create-section").classList.value = "hidden";
    document.querySelector("#favorites-section").classList.value = "hidden";
    document.querySelector("#music-section").classList.value = "hidden";
    
    // Show selected section
    document.querySelector(`#${section}-section`).classList.remove("hidden");

    // Which header gets darker (active class).
    document.querySelector(`#nav-random`).classList.remove("active");
    document.querySelector(`#nav-music`).classList.remove("active");
    document.querySelector(`#nav-frontpage`).classList.remove("active");
    document.querySelector(`#nav-create`).classList.remove("active");
    document.querySelector(`#nav-favorites`).classList.remove("active");
    document.querySelector(`#nav-${section}`).classList.add("active");
}

function changeGridViewClicked() {
    if (listView == false) {
            listView = true;
            document.querySelector("#main-content-grid").classList.replace("cardsView", "listView");
        } else {
            listView = false;
            document.querySelector("#main-content-grid").classList.replace("listView", "cardsView");
        };
    


console.log(listView);
    displayArtists(artistsArray);
}

// Display artists.
function displayArtists(list) {
    // Clear grid
    document.querySelector("#main-content-grid").innerHTML = "";
    let HTMLelement = ``;
    
    // insert HTML for each item in globalArtistsArray.
    for (const artist of list) { 
        // define the element we will place on the website.
        if (listView == false) {
        HTMLelement = /* HTML */ `
            <article class="grid-item-artist" id="artist-${artist.id}">
                <img src="${artist.image}"/>
                <p>
                    <a href="${artist.website}">${artist.website}</a>
                </p>
                
                    <h2 class="artist-title">${artist.name}</h2>
                    
                    <h3>${artist.shortDescription}</h3>
                    <div class="artist-text-container">
                    <p>Born: ${artist.birthdate}</p>
                    <p>Active since: ${artist.activeSince}</p>
                    <p>Genres: ${artist.genres} </p>
                    <p>Label: ${artist.label}</p>
                    </div>
                    
        
                    <div class="btns">
                    
                        <button class="btn-update">🖊</button>
                        <button class="btn-delete">🗑</button>
                        <button class="btn-favorite" id="fav-btn-${artist.id}">♥</button>
                    </div> 
            </article>
        `;
        } else {
            HTMLelement = /* HTML */ `
            <article class="list-item-artist" id="artist-${artist.id}">
                <img src="${artist.image}"/>
                <h3>${artist.name}</h3>
                    
                    <p>${artist.shortDescription}</p>
                    <p>Born: ${artist.birthdate}</p>
                    <p>Active since: ${artist.activeSince}</p>
                    <p>${artist.genres} </p>
                    <p>Label(s): ${artist.label}</p>
                    
                    <a href="${artist.website}">Website</a>
        
                    <div class="btns">
                        <button class="btn-update">🖊</button>
                        <button class="btn-delete">🗑</button>
                        <button class="btn-favorite" id="fav-btn-${artist.id}">♥</button>
                    </div> 
            </article>
        `;
        };
        document.querySelector("#main-content-grid").insertAdjacentHTML(
            "beforeend", HTMLelement);

        if (artist.favorite === true) {
            document.querySelector("#main-content-grid article:last-child .btn-favorite").classList.add("favorite");
            document.querySelector(`#artist-${artist.id}`).classList.add("favorite-artist-card");
        }

        // edit button
        document
            .querySelector("#main-content-grid article:last-child .btn-update")
            .addEventListener("click", () => editArtistClicked(artist));

        // delete button
        document
            .querySelector("#main-content-grid article:last-child .btn-delete")
            .addEventListener("click", () => deleteArtistClicked(artist));
        // add to favorites button
        document
            .querySelector("#main-content-grid article:last-child .btn-favorite")
            .addEventListener("click", () => {addToFavoritesClicked(artist);
                
            });
        
    }
}

// MUSIC SECTION



// Edit button clicked on a specific artist.
function editArtistClicked(artist) {
    // show dialog.
    document.querySelector("#edit-artist-dialog").showModal();

    // Change title
    document.querySelector("#edit-title").textContent = `Editing post for ${artist.name}`;

    // Change image
    document.querySelector("#edit-image").innerHTML = /*HTML*/
    `<img src="${artist.image}"/>`;

    // Fill out form
    let form = document.querySelector("#edit-container");

    form.name.value = artist.name;
    form.description.value = artist.shortDescription;
    form.birthdate.value = artist.birthdate;
    form.activeSince.value = artist.activeSince;
    form.genres.value = artist.genres;
    form.label.value = artist.label;
    form.image.value = artist.image;
    form.website.value = artist.website;

    

    // Submit edited artist.
    document.querySelector("#edit-container").addEventListener("submit", async(event) => {
        event.preventDefault();
        const updatedArtist = {
            "id": artist.id,
            "name": form.name.value,
            "shortDescription": form.description.value,
            "birthdate": form.birthdate.value,
            "activeSince": form.activeSince.value,
            "genres": form.genres.value,
            "label": form.label.value,
            "image": form.image.value,
            "website": form.website.value,
            "favorite": artist.favorite
        }

        document.querySelector("#edit-artist-dialog").close();

        await editArtist(updatedArtist);
        artistsArray = await getArtists();
        filterInArray(artistsArray);
        fillFavoritesArray(artistsArray);
    });

        

 }

 // Random artist clicked

 async function randomArtistViewClicked() {
    let artistObject = {};
    artistObject = await getRandomArtist();

    console.log(`Fetched random artist ${artistObject.name} from server`);

    previousArtistObject = artistObject.id;

    let HTMLelement = /*HTML*/ `
    <img src="${artistObject.image}"/>
    <div>
        <h3>${artistObject.name}</h3>
        <a href="${artistObject.website}">${artistObject.website}</a>
        <p>${artistObject.shortDescription}</p>
        <ul>
            <li>Born on ${artistObject.birthdate}</li>
            <li>Has been active in the music industry since ${artistObject.activeSince}.</li>
            <li>${artistObject.name} is primarily associated with ${artistObject.genres.toLowerCase()}.</li>
            <li>They have been signed to the record label(s) ${artistObject.label}.</li>
            <br/>
        </ul>
        
        <div class="3btn-holder">
        <button class="btn-favorite">♥</button>
    </div>
        <br/>
    </div>
    
    `;
    document.querySelector("#random-section-container").innerHTML = HTMLelement;
    toggleGreenGlow();
    document
            .querySelector("#random-section-container button")
            .addEventListener("click", async () => {
                
                addToFavoritesClicked(artistObject);
                toggleGreenGlow();
            });

     function toggleGreenGlow() {
         if (artistObject.favorite === true) {
             document.querySelector("#random-section-container .btn-favorite").classList.add("favorite");
             document.querySelector("#random-section-container").classList.add("favorite-artist-card");
         } else {
             document.querySelector("#random-section-container .btn-favorite").classList.remove("favorite");
             document.querySelector("#random-section-container").classList.remove("favorite-artist-card");
         }
     }
 }

// Delete button clicked on a specific artist.
function deleteArtistClicked(artist) {
    // Check if button works.
    console.log(`You are about to delete the artist post for ${artist.name} with id: ${artist.id}`);

    // Show dialog for deleting an artist.
    document.querySelector("#dialog-delete-artist").showModal();

    // Display artist information in dialog.
    document.querySelector("#dialog-delete-artist-name").textContent =
    `You are about to delete the artist post for ${artist.name} (ID: ${artist.id})`;
    
    // If YES is pressed, use the delete function made in rest.js
    document
    .querySelector("#form-delete-artist")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        
        deleteArtist(artist.id);
        document.querySelector("#dialog-delete-artist").close();
    });
}

// Fill the favorites array.

function fillFavoritesArray(list) {
    favoritesArray.length = 0;
    for (const artist of list) {
        if (artist.favorite == true) {
            favoritesArray.push(artist)
        }
    }
    // Diplays favorites (sorted)
    displayFavorites(favoritesArray.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())));
}


// Display favorites array.

function displayFavorites(list) {
    // Clear grid
    document.querySelector("#favorites-content-grid").innerHTML = "";
    
    // insert HTML for each item in globalArtistsArray.
    for (const artist of list) { 
        // define the element we will place on the website.
        let HTMLelement = /* HTML */ `
            <article class="grid-item-artist favorite-artist-card" id="fav-artist-${artist.id}">
                <img src="${artist.image}">
                <p>
                    <a href="${artist.website}">${artist.website}</a>
                </p>
                
                    <h2 class="artist-title">${artist.name}</h2>
                    
                    <h3>${artist.shortDescription}</h3>
                    <div class="artist-text-container">
                    <p>Born: ${artist.birthdate}</p>
                    <p>Active since: ${artist.activeSince}</p>
                    <p>Genres: ${artist.genres} </p>
                    <p>Label: ${artist.label}</p>
                    </div>
                    
        
                    <div class="btns">
                    
                        <button class="btn-update">🖊</button>
                        <button class="btn-delete">🗑</button>
                        <button class="btn-favorite">♥</button>
                    </div> 
            </article>
        `;
        document.querySelector("#favorites-content-grid").insertAdjacentHTML(
            "beforeend", HTMLelement);

        if (artist.favorite === true) {
            document.querySelector("#favorites-content-grid article:last-child .btn-favorite").classList.add("favorite");
        }

        document
            .querySelector("#favorites-content-grid article:last-child .btn-update")
            .addEventListener("click", () => editArtistClicked(artist));

        document
            .querySelector("#favorites-content-grid article:last-child .btn-delete")
            .addEventListener("click", () => deleteArtistClicked(artist));
        
        document
        .querySelector("#favorites-content-grid article:last-child .btn-favorite")
        .addEventListener("click", (event) => {
            addToFavoritesClicked(artist);
            document.querySelector(`#fav-artist-${artist.id}`).remove();
        });
        
    }
}

// Add to favorites clicked

function addToFavoritesClicked(artist) {    
    // Console log what artist we are  checking.
    
    // Change favorite state for object.
    if (artist.favorite == true) {
        console.log(`Removed ${artist.name} from favorites.`);
        artist.favorite = false;
        document.querySelector(`#artist-${artist.id}`).classList.remove("favorite-artist-card");
        document.querySelector(`#fav-btn-${artist.id}`).classList.remove("favorite");
        updateArtist(artist);
    } else {
        console.log(`Liked ${artist.name} and added to favorites.`);
        document.querySelector(`#fav-btn-${artist.id}`).classList.add("favorite");
        document.querySelector(`#artist-${artist.id}`).classList.add("favorite-artist-card");
        artist.favorite = true;
        updateArtist(artist);
    }
    // Update artist in server.
    
  }




export {
    displayArtists,
    artistsArray,
    changeView
}