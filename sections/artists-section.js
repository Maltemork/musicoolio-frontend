"use strict";

import {
    getData,
    deleteArtist,
    editArtist,
    getRandomArtist
} from "../crud/rest.js";

import {
    sortAnArray
} from "../crud/sort-filter-search.js";

let artistsArray = [];
let listView = false;


window.addEventListener("load", startFunction);

async function startFunction() {
    // eventlisteners
    console.log("Javascript is running 👍");
    artistsArray = await getData("artists");
    console.log(artistsArray);

    // Diplay artists
    displayArtists(artistsArray);

    // starts event listeners
    startEventListeners();

    const filterParm = document.querySelector("#filterArtists").value;
    const sortParm = document.querySelector("#sortBy").value;
    const searchParm = document.querySelector("#searchField").value;

    document.querySelector("#filterArtists").addEventListener("change", async () => {displayArtists(await sortAnArray(artistsArray, filterParm, searchParm, sortParm));});

    document.querySelector("#sortBy").addEventListener("change", async () => {displayArtists(await sortAnArray(artistsArray, filterParm, searchParm, sortParm));});

    document.querySelector("#searchField").addEventListener("input", async () => {displayArtists(await sortAnArray(artistsArray, filterParm, searchParm, sortParm));});
}

function startEventListeners() {

    

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

    // Close details button
    document.querySelector("#close-details-button").addEventListener("click", 
    () => document.querySelector("#extended-artist-details").close()
    );
    
}

function changeView(section) {
    console.log(`Changed view to ${section}.`);
    // Hide all sections
    document.querySelector("#random-section").classList.value = "hidden";
    document.querySelector("#frontpage-section").classList.value = "hidden";
    document.querySelector("#create-section").classList.value = "hidden";
    document.querySelector("#music-section").classList.value = "hidden";
    
    // Show selected section
    document.querySelector(`#${section}-section`).classList.remove("hidden");

    // Which header gets darker (active class).
    document.querySelector(`#nav-random`).classList.remove("active");
    document.querySelector(`#nav-music`).classList.remove("active");
    document.querySelector(`#nav-frontpage`).classList.remove("active");
    document.querySelector(`#nav-create`).classList.remove("active");
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
                <img src="${artist.image}" id="image-${artist.id}"/>
                    <h2 class="artist-title">${artist.name}</h2>
                    <p>
                </p>     
            </article>
        `;
        } else {
            HTMLelement = /* HTML */ `
            <article class="list-item-artist" id="artist-${artist.id}">
                <img src="${artist.image}"/>
                <h3>${artist.name}</h3>
                    
                    <p>${artist.shortDescription}</p>
                    <p>Born: ${new Date(artist.birthdate).getFullYear()}</p>
                    <p>Active since: ${artist.activeSince}</p>
                    <p>${artist.genres} </p>
                    <p>Label(s): ${artist.labels}</p>
            </article>
        `;
        };
        document.querySelector("#main-content-grid").insertAdjacentHTML(
            "beforeend", HTMLelement);

        
        
        document.querySelector(`#artist-${artist.id}`).addEventListener("click", () => openArtistDetails(artist));

        function openArtistDetails(artist) {
            let months = [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];
            let birthDay = new Date(artist.birthdate).getDate();
            let birthString = getSuffixOf(birthDay);
        
            function getSuffixOf(i) {
                var j = i % 10,
                    k = i % 100;
                if (j == 1 && k != 11) {
                    return i + "st";
                }
                if (j == 2 && k != 12) {
                    return i + "nd";
                }
                if (j == 3 && k != 13) {
                    return i + "rd";
                }
                return i + "th";
            }

            let ArtistDetailsHTML = /* HTML */`
                <img src="${artist.image}"/>
                    <h3>${artist.name}</h3>
                    <a href="${artist.website}">${artist.website}</a>
                    <p>${artist.shortDescription}</p>
                    <ul>
                        <li>Born on ${months[new Date(artist.birthdate).getMonth()]} ${birthString}, ${new Date(artist.birthdate).getUTCFullYear()}.</li>
                        <li>${artist.name} has been active in the music industry since ${artist.activeSince}.</li>
                        <li>Their music is primarily associated with ${artist.genres.toLowerCase()}.</li>
                        <li>They have been signed to the record label(s) ${artist.label}.</li>
                        <br/>
                    </ul>
                    
                    <div class="3btn-holder">
                        <div class="btns">
                        <button class="btn-update">🖊</button>
                        <button class="btn-delete">🗑</button>
                        </div> 
                    </div>
                    <br/>

            `;

            

            document.querySelector("#artist-details-container").innerHTML = ArtistDetailsHTML;
            // edit button
            document
                .querySelector("#artist-details-container .btn-update")
                .addEventListener("click", () => editArtistClicked(artist));

            // delete button
            document
                .querySelector("#artist-details-container .btn-delete")
                .addEventListener("click", () => deleteArtistClicked(artist));
            // add to favorites button

            document.querySelector("#extended-artist-details").showModal();
        }
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
        artistsArray = await getData("artists");
        sortAnArray(artistsArray);
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
            <li>Born on ${new Date(artistObject.birthdate).getFullYear()}</li>
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

export {
    displayArtists,
    artistsArray,
    changeView
}