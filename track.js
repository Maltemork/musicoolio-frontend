export function construct(trackdata) {
    const TrackObject = {
        id: trackdata.id,
        title: trackdata.title,
        album: trackdata.album,
        artistName: trackdata.artistName,
        releaseDate: trackdata.releaseDate,
        image: trackdata.trackImage,
        duration: trackdata.duration
    }

    Object.defineProperty(TrackObject, "id", {
        configurable: false,
        writable: false
      });

      Object.defineProperty(TrackObject, "name", {
        enumerable: false
      });
      
      Object.defineProperty(TrackObject, "image", {
        enumerable: false
      });

      return TrackObject;
}