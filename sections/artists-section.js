"use strict";

import {
    getData,
    deleteArtist,
    editArtist
} from "../crud/rest.js";

import * as artist from "../renderers/artist.js";

import {
    sortAnArray
} from "../crud/sort-filter-search.js";

let artistsArray = [];
let listView = false;




window.addEventListener("load", startFunction);

async function startFunction() {
    // eventlisteners
    console.log("Javascript is running 👍");
    await buildArtistList();

    // Diplay artists
    await sortArtists();

    // starts event listeners
    startEventListeners();
}

async function sortArtists() {
    const filterParm = document.querySelector("#filterArtists").value;
    const sortParm = document.querySelector("#sortBy").value;
    const searchParm = document.querySelector("#searchField").value;

    let sortedArray = await sortAnArray(artistsArray, filterParm, searchParm, sortParm);
    displayArtists(sortedArray);
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


    // LIST VIEW / GRID VIEW button
    document.querySelector("#change-grid-btn").addEventListener("click", changeGridViewClicked);

    // Close details button
    document.querySelector("#close-details-button").addEventListener("click", 
    () => document.querySelector("#extended-artist-details").close()
    );

    // Artist sort/search/filter

    document.querySelector("#filterArtists").addEventListener("change", sortArtists);
    document.querySelector("#sortBy").addEventListener("change", sortArtists);
    document.querySelector("#searchField").addEventListener("input", sortArtists);
    
}


function changeGridViewClicked() {
    if (listView == false) {
            listView = true;
            document.querySelector("#main-content-grid").classList.replace("cardsView", "listView");
        } else {
            listView = false;
            document.querySelector("#main-content-grid").classList.replace("listView", "cardsView");
        };
    

        document.querySelector("#main-content-grid").innerHTML = "";    
        sortArtists();
}

async function buildArtistList() {
    const data = await getData("artists");
    artistsArray = data.map(artist.constructArtistObject);
}

// Display artists.
function displayArtists(array) {
    document.querySelector("#main-content-grid").innerHTML = "";
    let list = array;
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
                        <button class="btn-update hidden">🖊</button>
                        <button class="btn-delete hidden">🗑</button>
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
    document.querySelector("#loading-icon").classList.add("hidden");
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
    artistsArray
 
}