"use strict";

import { getData } from "./rest.js";
import * as track from "./track.js";
import * as ListRenderer from "./listRenderer.js";
import { TrackRenderer } from "./trackRenderer.js";

window.addEventListener("load", initMusicPage);

let tracksArray = [];


async function initMusicPage() {
    // Build the list
    await buildTracksList();
    console.log(tracksArray);

    // Start eventlisteners for sorting tracks.
    startEvntListnrs();

    // Render list
    clearTracksTable("#tracks-table tbody");
    const tracksList = ListRenderer.construct(tracksArray, "#tracks-table tbody", TrackRenderer);
    tracksList.sort("title");

    document.querySelector("#sort-tracks-number").addEventListener("click", () => tracksList.sort("number"));
    document.querySelector("#sort-tracks-title").addEventListener("click", () => tracksList.sort("title"));
    document.querySelector("#sort-tracks-artist").addEventListener("click", () => tracksList.sort("artistName"));
    document.querySelector("#sort-tracks-album").addEventListener("click", () => tracksList.sort("album"));
    document.querySelector("#sort-tracks-releasedate").addEventListener("click", () => tracksList.sort("releaseDate"));
    document.querySelector("#sort-tracks-duration").addEventListener("click", () => tracksList.sort("duration"));

    function sortClick(sortParam) {
        console.log("CLICK")
        tracksList
    }
}


async function buildTracksList() {
    const data = await getData("tracks");
    tracksArray = data.map(track.construct);
}

export function getTrack(trackId) {
    return tracksArray.find(track => track.id === trackId);
}

function clearTracksTable(table) {
    document.querySelector(`${table}`).innerHTML = "";
    document.querySelector("#tracks-loading-icon").remove();
}

function startEvntListnrs() {
    
}