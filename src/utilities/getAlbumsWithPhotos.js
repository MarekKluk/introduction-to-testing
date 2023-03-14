import { getPhotos } from './getPhotos';
import { getAlbums } from './getAlbums';

export async function getAlbumsWithPhotos() {
  try {
    const photos = await getPhotos();
    const albums = await getAlbums();

    return albums.map((album) => {
      const albumsMatchingPhotos = photos.filter(
        (photo) => photo.albumId === album.id,
      );
      return { ...album, photos: albumsMatchingPhotos };
    });
  } catch {
    return [];
  }
}
