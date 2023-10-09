"use strict";

import {
    getRandomArtist,
} from "./rest.js";

window.addEventListener("load", startFunction);

async function startFunction() {
    document.querySelector("#new-random-artist-btn").addEventListener("click", randomArtistView);
    await randomArtistView();
}

async function randomArtistView() {
    let artistObject = {};
    artistObject = await getRandomArtist();

    let months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    console.log(`Fetched random artist ${artistObject.name} from server`);
    console.log(artistObject);

    let HTMLelement = /*HTML*/ `
    <img src="${artistObject.image}"/>
    <div>
        <h3>${artistObject.name}</h3>
        <a href="${artistObject.website}">${artistObject.website}</a>
        <p>${artistObject.shortDescription}</p>
        <ul>
            <li>Born on ${months[new Date(artistObject.birthdate).getMonth()]} ${new Date(artistObject.birthdate).getUTCDay()}, ${new Date(artistObject.birthdate).getUTCFullYear()}.</li>
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

