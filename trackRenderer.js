export const TrackRenderer = {
    render(track) {   
      const html = /*html*/`
        <tr>
          <td>${track.number}</td>
          <td>${track.title}</td>
          <td>${track.artistName}</td>
          <td>${track.album}</td>
          <td>${track.releaseDate.toLocaleString("da", {month: "short", day: "numeric", year: "numeric"})}</td>
          <td>${track.duration}</td>
        </tr>`;
      return html;
    }
  }