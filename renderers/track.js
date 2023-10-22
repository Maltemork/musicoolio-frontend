export function constructTrackObject(trackdata) {
    const TrackObject = {
        id: trackdata.id,
        number: trackdata.trackNo,
        title: trackdata.title,
        album: trackdata.albumName,
        artistName: trackdata.artistName,
        releaseDate: trackdata.releaseDate,
        duration: trackdata.duration
    }

    Object.defineProperty(TrackObject, "id", {
        configurable: false,
        writable: false
      });

      Object.defineProperty(TrackObject, "title", {
        enumerable: false
      });

      return TrackObject;
}