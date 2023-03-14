import { getUsers } from './getUsers';

export async function getUsersSortedByName() {
  try {
    const users = await getUsers();

    return users.sort((firstUser, secondUser) => {
      return secondUser.name.length - firstUser.name.length;
    });
  } catch {
    return [];
  }
}
