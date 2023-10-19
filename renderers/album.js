export function constructAlbumObject(albumdata) {
    const AlbumObject = {
        id: albumdata.albumId,
        title: albumdata.title,
        artistName: albumdata.artistName,
        releaseDate: albumdata.releaseDate,
        duration: albumdata.duration
    }

    Object.defineProperty(AlbumObject, "id", {
        configurable: false,
        writable: false
      });

      Object.defineProperty(AlbumObject, "title", {
        enumerable: false
      });

      return AlbumObject;
}