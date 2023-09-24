"use strict";

import {
  displayArtists,
  changeView
} from "./frontend.js"
import { filterInArray } from "./sort-filter-search.js";

const endpoint = "http://localhost:8801";

// Artists array (global);

async function getArtists() {
    const response = await fetch(`${endpoint}/artists`);
    const data = await response.json();
    const artists = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return artists;
} 


// Submit new artist function.
async function submitNewArtist(event) {
    event.preventDefault();
    console.log("Submit artist.");
    // prevent default behaviour.
    

    // Define all the values.
    const form = event.target;
    const name = form.name.value;
    const birthdate = form.birth.value;
    const activeSince = form.activeSince.value;
    const label = form.label.value;
    const website = form.website.value;
    const genres = form.genres.value;
    const shortDescription = form.description.value;
    const image = form.image.value;
  
    // create new artist object.
    const newArtist = {
      name,
      birthdate,
      activeSince,
      label,
      website,
      genres,
      shortDescription,
      image,
    };
    
    // Make the object into a json format.
    const artistAsJson = JSON.stringify(newArtist);
    // Send object to server (POST request)
    const response = await fetch(`${endpoint}/artists`, {
      method: "POST",
      body: artistAsJson,
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    // If POST is OK, update the artistgrid and change view to frontpage.
    if (response.ok) {
        document.querySelector("#form-container").reset();
        let artistsArray = await getArtists();
        displayArtists(artistsArray);
        changeView("frontpage");
    }
  }

// Get random artist

async function getRandomArtist() {
  const response = await fetch(`${endpoint}/artists/random`);
  const data = await response.json();
  return data;
}

// Delete a specific artist.
async function deleteArtist(id) {
    // Make a DELETE request to the endpoint.
    const response = await fetch(`${endpoint}/artists/${id}`, {
      method: "DELETE",
    });

    // If the response is okay, update the artists array and display it on the frontpage.
    if (response.ok) {
        let artistsArray = await getArtists();
        filterInArray(artistsArray);
    }
  }

  //update a specific artist.
  async function updateArtist(artist) {
    // Define values.
    const id = artist.id;
    const name = artist.name; 
    const birthdate = artist.birthdate;
    const activeSince = artist.activeSince;
    const label = artist.label;
    const website = artist.website;
    const genres = artist.genres;
    const shortDescription = artist.shortDescription;
    const image = artist.image;
    const favorite = artist.favorite;
  
    // Define structure of object and hold it.
    const artistToUpdate = {
      id,
      name,
      birthdate,
      activeSince,
      label,
      website,
      genres,
      shortDescription,
      image,
      favorite,
    };
    // Make object into JSON.
    const artistAsJson = JSON.stringify(artistToUpdate);
    // Send to server
    const response = await fetch(`${endpoint}/artists/${artist.id}`, {
      method: "PUT",
      body: artistAsJson,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`${artist.name} has been updated on server.`);
    }
  }
  
  // Edit artist
  async function editArtist(artist) {

    const ArtistJSON = JSON.stringify(artist);

    // Send PUT request to server.
    const response = await fetch(`${endpoint}/artists/${artist.id}`, {
        method: "PUT",
        body: ArtistJSON,
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.ok) {
        console.log("Artist has been updated.")
      }
 }
 

export {
    getArtists,
    updateArtist,
    submitNewArtist,
    deleteArtist,
    editArtist,
    filterInArray,
    getRandomArtist

};

    


