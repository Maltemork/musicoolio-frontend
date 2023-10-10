"use strict";

import {
    getRandomArtist,
} from "./rest.js";

window.addEventListener("load", startFunction);

function startFunction() {
    randomArtistView();

    // event listener
    document.querySelector("#new-random-artist-btn").addEventListener("click", async () => {
        document.querySelector("#random-artist-container").innerHTML = `<img id="loading-icon" src="./styling-and-ui/icons/loading-icon.svg" class="loading-icon"/>`;
        randomArtistView();
    });  
}

async function randomArtistView() {
    let artistObject = {};
    artistObject = await getRandomArtist();

    let months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];

    let birthDay = new Date(artistObject.birthdate).getDate();
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

    console.log(`Fetched random artist ${artistObject.name} from server`);
    console.log(artistObject);

    let HTMLelement = /*HTML*/ `
    <h3 id="random-artist-title" style="color: white; margin-left: 220px; font-family:'Times New Roman', Times, serif; font-size: 30px;">Random artist:</h3>
    <div id="random-artist-card">
        <img src="${artistObject.image}"/>
        <div>
            <h3>${artistObject.name}</h3>
            <a href="${artistObject.website}">${artistObject.website}</a>
            <p>${artistObject.shortDescription}</p>
            <ul>
                <li>Born on ${months[new Date(artistObject.birthdate).getMonth()]} ${birthString}, ${new Date(artistObject.birthdate).getUTCFullYear()}.</li>
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
    </div>
    `;

    

    document.querySelector("#random-artist-container").innerHTML = HTMLelement;
    toggleGreenGlow();
    document
            .querySelector("#random-artist-card button")
            .addEventListener("click", async () => {
                
                addToFavoritesClicked(artistObject);
                toggleGreenGlow();
            });
    function toggleGreenGlow() {
        if (artistObject.favorite === true) {
            document.querySelector("#random-artist-card .btn-favorite").classList.add("favorite");
            document.querySelector("#random-artist-card").classList.add("favorite-artist-card");
        } else {
            document.querySelector("#random-artist-card .btn-favorite").classList.remove("favorite");
            document.querySelector("#random-artist-card").classList.remove("favorite-artist-card");
        }
    }
}

