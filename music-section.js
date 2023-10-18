<<<<<<< Updated upstream
import { getData } from "./rest.js";

"use strict";

window.addEventListener("load", start);

let tracks = [];

async function start() {
    tracks = await getData("tracks");
    console.log(tracks);
}
=======
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

    // Render list
    const tracksList = ListRenderer.construct(tracksArray, "#tracks-table tbody", TrackRenderer);
    tracksList.render();
}


async function buildTracksList() {
    const data = await getData("tracks");
    tracksArray = data.map(track.construct);
}

export function getTrack(trackId) {
    return tracksArray.find(track => track.id === trackId);
}


// function clearTable() {
//     this.table.innerHTML = /*HTML*/`
//         <tr class="tracks-header">
//             <th>Title</th>
//             <th>Artist</th>
//             <th>Album</th>
//             <th>Duration</th>
//             <th>Release date</th>
//         </tr>
//     `;
// };
>>>>>>> Stashed changes
