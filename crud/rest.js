"use strict";

const endpoint = "https://musicooliowebapp.azurewebsites.net";

// Artists array (global);

async function getData(type) {
    const response = await fetch(`${endpoint}/${type}`);
    const data = await response.json();
    const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    return dataArray;
}


// Submit new artist function.
async function submitNewArtist(event) {
    event.preventDefault();
    console.log("Submit artist.");

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
  
    // create object out of new artist.
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
        console.log("Artist added.")
    };
  }


async function submitNewAlbum(event) {
  event.preventDefault();

    // Define values.
    const form = event.target;
    const artist = form.artist.value;
    const title = form.title.value;
    const releaseDate = form.releaseDate.value;
    const albumArt = form.albumArt.value;

    // Create object out of new album.
    const newAlbum = {
      artist,
      title,
      releaseDate,
      albumArt
    };

    // Make
    const albumAsJson = JSON.stringify(newAlbum);

    // Send object to server (POST request)
    const response = await fetch(`${endpoint}/albums`, {
      method: "POST",
      body: albumAsJson,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If POST is OK, update the artistgrid and change view to frontpage.
      if (response.ok) {
        document.querySelector("#add-album-container").reset();
        window.location.href = "./music.html";
    };

}

// Submit new song function
async function submitNewSong(event) {
  event.preventDefault();
  console.log("Submitting song");

  // Define values.
  const form = event.target;
  const title = form.title.value;
  const album = form.album.value;
  const year = form.year.value;
  const length = form.length.value;

  // Create object out of new song.
  const newSong = {
    title,
    album,
    year,
    length
  };
  
  // Make JSON.
  const songAsJson = JSON.stringify(newSong);

  // Send object to server (POST request)
  const response = await fetch(`${endpoint}/tracks`, {
    method: "POST",
    body: songAsJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // If POST is OK, update the artistgrid and change view to frontpage.
  if (response.ok) {
      document.querySelector("#add-song-container").reset();
      window.location.href = "./music.html";
  };
  
}

// Get random artist

async function getRandomArtist() {
  const response = await fetch(`${endpoint}/artists/random`);
  const data = await response.json();
  return data;
}

// Delete a specific artist.
async function deleteArtist(artistId) {
    // Make a DELETE request to the endpoint.
    const response = await fetch(`${endpoint}/artists/${artistId}`, {
      method: "DELETE",
    });

    // If the response is okay, update the artists array and display it on the frontpage.
    if (response.ok) {
        return await getData("artists");
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

  async function search(table, column, searchValue) {
      const response = await fetch(`${endpoint}/${table}/search/${column}/${searchValue}`);
      const data = await response.json();
      const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
      return dataArray;
  }
 

export {
    getData,
    updateArtist,
    deleteArtist,
    editArtist,
    getRandomArtist,
    submitNewArtist,
    submitNewSong,
    submitNewAlbum,
    search
};

    

