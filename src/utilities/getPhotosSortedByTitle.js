import { getPhotos } from './getPhotos';

export async function getPhotosSortedByTitle() {
  try {
    const posts = await getPhotos();

    return posts.sort((firstPhoto, secondPhoto) => {
      return secondPhoto.title.length - firstPhoto.title.length;
    });
  } catch {
    return [];
  }
}
