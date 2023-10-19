"use strict";

import { getData } from "./rest.js";
import * as album from "./renderers/album.js"
import * as track from "./renderers/track.js";
import * as ListRenderer from "./renderers/listRenderer.js";
import { AlbumRenderer } from "./renderers/albumRenderer.js";
import { TrackRenderer } from "./renderers/trackRenderer.js";

window.addEventListener("load", initMusicPage);

let tracksArray = [];
let albumsArray = [];

async function initMusicPage() {
    // Build the list
    await changeTable("songs")
    

    // Eventlistener til knapperne i toppen
    document.querySelector("#change-to-songs-table").addEventListener("click", () => changeTable("songs"));
    document.querySelector("#change-to-albums-table").addEventListener("click", () => changeTable("albums"));
}


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