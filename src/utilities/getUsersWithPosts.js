import { getUsers } from "./getUsers";
import { getPosts } from "./getPosts";

export async function getUsersWithPosts () {
	try {
		const posts = await getPosts();
		const users = await getUsers();

		return users.map(user => {
			const usersMatchingPosts = posts.filter(post => post.userId === user.id)
			return {...user, posts: usersMatchingPosts}
		});
	}
	catch {
		return []
	}
}
