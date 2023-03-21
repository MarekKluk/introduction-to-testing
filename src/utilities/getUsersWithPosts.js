import { getUsers } from './getUsers';
import { getPosts } from './getPosts';

export async function getUsersWithPosts() {
  try {
    const [posts, users] = await Promise.all([getPosts(), getUsers()]);

    return users.map((user) => {
      const postsMatchingTheUser = posts.filter(
        (post) => post.userId === user.id,
      );
      return { ...user, posts: postsMatchingTheUser };
    });
  } catch {
    return [];
  }
}
