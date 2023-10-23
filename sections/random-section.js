"use strict";

import {
    getRandomArtist,
    getRandomAlbum,
    getRandomTrack
} from "../crud/rest.js";

window.addEventListener("load", startFunction);


function startFunction() {
    randomArtistView();
    randomAlbumView();
    randomTrackView();
    // event listener
    document.querySelector("#new-random-artist-btn").addEventListener("click", async () => {
        document.querySelector("#random-artist-container").innerHTML = `<img id="loading-icon" src="./styling-and-ui/icons/loading-icon.svg" class="loading-icon"/>`;
        document.querySelector("#random-album-container").innerHTML = ``;
        document.querySelector("#random-track-container").innerHTML = ``;
        randomArtistView();
        randomAlbumView();
        randomTrackView();
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

        </div>
            <br/>
        </div>
    </div>
    `;
    document.querySelector("#random-artist-container").innerHTML = HTMLelement;
}

async function randomAlbumView() {
    let albumObject = {};
    albumObject = await getRandomAlbum();

    console.log(`Fetched random album ${albumObject.title} from server`);

    let HTMLelement = /*HTML*/ `
    <h3 id="random-artist-title" style="color: white; margin-left: 220px; font-family:'Times New Roman', Times, serif; font-size: 30px;">Random album:</h3>
    <div id="random-artist-card">
        <img src="${albumObject.albumArt}"/>
        <div>
            <h3>${albumObject.title}</h3>
            <p>Album by ${albumObject.artistName}</p>
            <ul>
                <li>Released on ${albumObject.releaseDate}.</li>
                <br/>
            </ul>

        </div>
            <br/>
        </div>
    </div>
    `;
    document.querySelector("#random-album-container").innerHTML = HTMLelement;
}

async function randomTrackView() {
    let trackObject = {};
    trackObject = await getRandomTrack();

    console.log(`Fetched random song ${trackObject.title} from server`);

    let HTMLelement = /*HTML*/ `
    <h3 id="random-artist-title" style="color: white; margin-left: 220px; font-family:'Times New Roman', Times, serif; font-size: 30px;">Random track:</h3>
    <div id="random-artist-card">
    <h3>${trackObject.title}</h3>
        <div>
            
            <p>Found on the album ${trackObject.albumName}.</p>
            <p>Track by ${trackObject.artistName}.</p>
            
            <ul>
                <br/>
            </ul>

        </div>
        
            <br/>
            
        </div>
    </div>
    `;
    document.querySelector("#random-track-container").innerHTML = HTMLelement;
}

