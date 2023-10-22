export const ArtistListRenderer = {
    render(artist) {   
      const html = /*html*/`
        <article class="list-item-artist" id="artist-${artist.id}">
            <img src="${artist.image}"/>
            <h3>${artist.name}</h3>
                <p>${artist.shortDescription}</p>
                <p>Born: ${new Date(artist.birthdate).getFullYear()}</p>
                <p>Active since: ${artist.activeSince}</p>
                <p>${artist.genres} </p>
                <p>Label(s): ${artist.labels}</p>
        </article>`;
        return html;
    }
  }