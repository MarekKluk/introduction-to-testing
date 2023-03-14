import { getPosts } from './getPosts';

export async function getPostsSortedByTitle() {
  try {
    const posts = await getPosts();

    return posts.sort((firstPost, secondPost) => {
      return secondPost.title.length - firstPost.title.length;
    });
  } catch {
    return [];
  }
}
