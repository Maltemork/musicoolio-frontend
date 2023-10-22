export const AlbumDetailsRenderer = {
    render(album) {   
      const html = /*html*/`
        <div id="album-details-${album.id}">
          <img src="${album.albumArt}" class="album-details-img"></img>
          <h1 class="album-details-title">${album.title}</h1>
          <p class="album-details-artist">${album.artistName}</p>
          <p class="album-details-release">Released ${album.releaseDate}</p>
        </div>`;   
      return html;
    }
  }