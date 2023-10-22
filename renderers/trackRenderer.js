export const TrackRenderer = {
    render(track) {   
      const html = /*html*/`
        <tr>
          <td>${track.title}</td>
          <td>${track.artistName}</td>
          <td>${track.album}</td>
          <td>${track.releaseDate}</td>
          <td>${track.duration}</td>
        </tr>`;
      return html;
    }
  }