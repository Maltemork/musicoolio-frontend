export const ArtistGridRenderer = {
    render(artist) {   
      const html = /*html*/`
        <div class="grid-item-artist" id="artist-${artist.id}">
            <img src="${artist.image}" id="image-${artist.id}"/>
                <h2 class="artist-title">${artist.name}</h2>
                <p>
            </p>     
        </div>`;
        return html;
    }
  }