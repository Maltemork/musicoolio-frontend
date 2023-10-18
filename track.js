export function construct(trackdata) {
    const TrackObject = {
        id: trackdata.id,
        number: trackdata.trackNo,
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

      Object.defineProperty(TrackObject, "title", {
        enumerable: false
      });
      
      Object.defineProperty(TrackObject, "image", {
        enumerable: false
      });

      return TrackObject;
}