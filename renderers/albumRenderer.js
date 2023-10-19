export const AlbumRenderer = {
    render(album) {   
      const html = /*html*/`
        <div>
          <div>${album.image}</div>
          <div>${album.title}</div>
          <div>${album.artistName}</div>
          <div>${album.releaseDate.toLocaleString("da", {  month: "long", day: "numeric", year: "numeric"})}</div>
        </div>`;
      return html;
    }
  }