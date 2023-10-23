"use strict";

export function constructArtistObject(artist) {
    const ArtistObject = {
        id: artist.artistId,
        name: artist.name,
        birthdate: artist.birthdate,
        activeSince: artist.activeSince,
        image: artist.image,
        website: artist.website,
        labels: artist.labels,
        genres: artist.genres,
        shortDescription: artist.shortDescription
    }

    Object.defineProperty(ArtistObject, "id", {
        configurable: false,
        writable: false
      });

      Object.defineProperty(ArtistObject, "name", {
        enumerable: false
      });

      return ArtistObject;
}