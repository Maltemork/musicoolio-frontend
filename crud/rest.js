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
    const labels = form.labels.value;
    const website = form.website.value;
    const genres = form.genres.value;
    const shortDescription = form.description.value;
    const image = form.image.value;
  
    // create object out of new artist.
    const newArtist = {
      name,
      birthdate,
      activeSince,
      labels,
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
        document.querySelector("#add-artist-container").reset();
        window.location.href = "./music.html";
    };
  }


async function submitNewAlbum(event) {
  event.preventDefault();

    // Define values.
    const form = event.target;
    const artistName = form.artists.value;
    const title = form.title.value;
    const releaseDate = form.releaseDate.value;
    const albumArt = form.albumArt.value;

    // Create object out of new album.
    const newAlbum = {
      artistName,
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

async function getAlbumTracks(albumId) {
  const response = await fetch(`${endpoint}/albums/export/${albumId}`);
  const data = await response.json();
  const dataArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
  return dataArray;
}

// Submit new song function
async function submitNewSong(event) {
  event.preventDefault();
  console.log("Submitting song");

 

  const form = event.target;

  // Define values.
  let fixedDuration = 0;

  if (form.duration.value[0] == 0) {
    fixedDuration = form.duration.value.slice(1);
    console.log(fixedDuration);
  }

  const albumName = form.album.value;
  const title = form.title.value;
  const artistName = form.artist.value;
  const duration = fixedDuration;
  const trackNo = form.number.value;

  // Create object out of new song.
  const newSong = {
    albumName,
    title,
    artistName,
    duration,
    trackNo
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
      document.querySelector("#add-track-container").reset();
  };
  
}

// Get random artist

async function getRandomArtist() {
  const response = await fetch(`${endpoint}/artists/random`);
  const data = await response.json();
  return data;
}

async function getRandomAlbum() {
  const response = await fetch(`${endpoint}/albums/random`);
  const data = await response.json();
  return data;
}

async function getRandomTrack() {
  const response = await fetch(`${endpoint}/tracks/random`);
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
    getRandomAlbum,
    getRandomTrack,
    submitNewArtist,
    submitNewSong,
    submitNewAlbum,
    getAlbumTracks,
    search
};

    


