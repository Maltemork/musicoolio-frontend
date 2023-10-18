import { getData } from "./rest.js";

"use strict";

window.addEventListener("load", start);

let tracks = [];

async function start() {
    tracks = await getData("tracks");
    console.log(tracks);
}