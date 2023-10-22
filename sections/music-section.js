"use strict";

import { getData, search } from "../crud/rest.js";
import * as album from "../renderers/album.js"
import * as track from "../renderers/track.js";
import * as ListRenderer from "../renderers/listRenderer.js";
import { AlbumDetailsRenderer } from "../renderers/albumDetailsRenderer.js";
import { AlbumRenderer } from "../renderers/albumRenderer.js";
import { TrackRenderer } from "../renderers/trackRenderer.js";


window.addEventListener("load", initMusicPage);

let tracksArray = [];
let albumsArray = [];

async function initMusicPage() {
    // Build the list
    await changeTable("songs")

    

    // Eventlistener til knapperne i toppen
    document.querySelector("#change-to-songs-table").addEventListener("click", () => changeTable("songs"));
    document.querySelector("#change-to-albums-table").addEventListener("click", () => changeTable("albums"));

    
    
    // dialog eventlistener
    document.querySelector("#close-details-button").addEventListener("click", () => document.querySelector("#album-details").close());
}


 // Tilføj event listener hvis det er albums


 

async function buildTracksList() {
    const data = await getData("tracks");
    tracksArray = data.map(track.constructTrackObject);
}

export function getTrack(trackId) {
    return tracksArray.find(track => track.id === trackId);
}

function clearTracksTable(table) {
    document.querySelector(`${table}`).innerHTML = "";
}   

async function buildAlbumsList() {
    const data = await getData("albums");
    albumsArray = data;
    console.log(albumsArray);
}

async function changeTable(table) {
    document.querySelector("#tracks-loading-icon").classList.remove("hidden");
    // Change view
    if (table === "albums") {
        document.querySelector("#tracks-table").classList.replace("active-section", "hidden");
        document.querySelector("#albums-table").classList.replace("hidden", "active-section");
        document.querySelector("#change-to-songs-table").classList.remove("active");
        document.querySelector("#change-to-albums-table").classList.add("active");

        clearTracksTable("#albums-table-container");
        await buildAlbumsList();
        const albumsList = ListRenderer.construct(albumsArray, "#albums-table-container", AlbumRenderer);
        document.querySelector("#tracks-loading-icon").classList.add("hidden");
        albumsList.sort("title");

        for (const album of albumsArray) {
            document.querySelector(`#album-${album.id}`).addEventListener("click", () => {displayAlbum(album);});
            }

    } else if (table === "songs") {
        document.querySelector("#tracks-table").classList.replace("hidden", "active-section");
        document.querySelector("#albums-table").classList.replace("active-section", "hidden");
        document.querySelector("#change-to-albums-table").classList.remove("active");
        document.querySelector("#change-to-songs-table").classList.add("active");

        clearTracksTable("#tracks-table tbody");
        await buildTracksList();
        const tracksList = ListRenderer.construct(tracksArray, "#tracks-table tbody", TrackRenderer);
        document.querySelector("#tracks-loading-icon").classList.add("hidden");
        tracksList.sort("title");

        // Eventlisteners til sort.
        document.querySelector("#sort-tracks-title").addEventListener("click", () => tracksList.sort("title"));
        document.querySelector("#sort-tracks-artist").addEventListener("click", () => tracksList.sort("artistName"));
        document.querySelector("#sort-tracks-album").addEventListener("click", () => tracksList.sort("album"));
        document.querySelector("#sort-tracks-releasedate").addEventListener("click", () => tracksList.sort("releaseDate"));
        document.querySelector("#sort-tracks-duration").addEventListener("click", () => tracksList.sort("duration"));
    }
    
    
}


// Global variabel som holder timeout (blot så man kan clearTimeout i funktionen neden under).
let searchTimeout;
// Eventlisteners til search (med timeout).
document.querySelector("#search-tracks").addEventListener("input", () => {
    clearTimeout(searchTimeout);
    clearTracksTable("#tracks-table tbody");
    document.querySelector("#tracks-loading-icon").classList.remove("hidden");
    searchTimeout = setTimeout(searchTracks, "500");
});

// Funktionen for search i tracks
async function searchTracks() {

    let searchValue = document.querySelector("#search-tracks").value;
    

    if (searchValue == "") {
        console.log("Nothing in search field.")
        clearTracksTable("#tracks-table tbody");
        await buildTracksList();
        const tracksList = ListRenderer.construct(tracksArray, "#tracks-table tbody", TrackRenderer);
        document.querySelector("#tracks-loading-icon").classList.add("hidden");
        tracksList.sort("title");

        // Eventlisteners til sort.
        document.querySelector("#sort-tracks-title").addEventListener("click", () => tracksList.sort("title"));
        document.querySelector("#sort-tracks-artist").addEventListener("click", () => tracksList.sort("artistName"));
        document.querySelector("#sort-tracks-album").addEventListener("click", () => tracksList.sort("album"));
        document.querySelector("#sort-tracks-releasedate").addEventListener("click", () => tracksList.sort("releaseDate"));
        document.querySelector("#sort-tracks-duration").addEventListener("click", () => tracksList.sort("duration"));
    } else {
        console.log(searchValue);
        let _filteredTitles = await search("tracks", "title", `${searchValue}`);
        let _filteredArtists = await search("tracks", "artistName", `${searchValue}`);
        let newArray = removeDuplicates(_filteredTitles, _filteredArtists);

        function removeDuplicates(arr1, arr2) {  
            // Samler de 2 arrays som bliver givet
            let newArray = arr1.concat(arr2);
             // Starter et loop for arrayet.
            for (let i = 0; i < newArray.length; ++i) {
                // Starter et loop inde i loopet, så hvert objekt tjekker alle andre objekter.
                for (let j = i + 1; j < newArray.length; ++j) {
                    // Hvis 2 elementer har samme værdi, skal den ene fjernes fra arrayet.
                    if (newArray[i].trackId === newArray[j].trackId) {
                        console.log(newArray[i]);
                        newArray.splice(j, 1); // Fjerner J objektet
                    }
                }
            }
            return newArray;
        }
        console.log(newArray);
        const filteredTrackList = ListRenderer.construct(newArray, "#tracks-table tbody", TrackRenderer);
        document.querySelector("#tracks-loading-icon").classList.add("hidden");
        filteredTrackList.sort("title");

        // Nye eventlisteners
        document.querySelector("#sort-tracks-title").addEventListener("click", () => filteredTrackList.sort("title"));
        document.querySelector("#sort-tracks-artist").addEventListener("click", () => filteredTrackList.sort("artistName"));
        document.querySelector("#sort-tracks-album").addEventListener("click", () => filteredTrackList.sort("album"));
        document.querySelector("#sort-tracks-releasedate").addEventListener("click", () => filteredTrackList.sort("releaseDate"));
        document.querySelector("#sort-tracks-duration").addEventListener("click", () => filteredTrackList.sort("duration"));
    }
    
}

export function displayAlbum(album) {
    document.querySelector("#album-details").showModal();
    const html = AlbumDetailsRenderer.render(album);
    document.querySelector("#album-details-container").innerHTML = html;
    
}