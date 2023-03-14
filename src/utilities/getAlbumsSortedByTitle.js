import { getAlbums } from './getAlbums';

export async function getAlbumsSortedByTitle() {
  try {
    const posts = await getAlbums();

    return posts.sort((firstAlbum, secondAlbum) => {
      return secondAlbum.title.length - firstAlbum.title.length;
    });
  } catch {
    return [];
  }
}
