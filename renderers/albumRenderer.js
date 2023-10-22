export const AlbumRenderer = {
    render(album) {   
      const html = /*html*/`
        <div id="album-${album.id}" class="album-list-item">
          <img src="${album.albumArt}" class="album-container-img"></img>
          <h1 class="album-container-title">${album.title}</h1>
          <p class="album-container-artist">By ${album.artistName}</p>
          <p class="album-container-release">Released ${album.releaseDate}</p>
        </div>`;   
      return html;
    }
  }