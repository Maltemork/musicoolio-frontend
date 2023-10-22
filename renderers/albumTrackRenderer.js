export const AlbumTrackRenderer = {
    render(track) {   
      const html = /*html*/`
        <tr>
        <td>${track.trackNo}</td>
          <td>${track.trackTitle}</td>
          <td>${track.duration}</td>
        </tr>`;
      return html;
    }
  }