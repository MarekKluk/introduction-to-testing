import { getUsers } from './getUsers';
import { getPosts } from './getPosts';
import { getUsersWithPosts } from './getUsersWithPosts';

jest.mock('./getUsers', () => {
  return {
    getUsers: jest.fn(),
  };
});
jest.mock('./getPosts', () => {
  return {
    getPosts: jest.fn(),
  };
});

describe('The getUsersWithPosts function', () => {
  describe('when the getUsersWithPosts function is called', () => {
    beforeEach(async () => {
      await getUsersWithPosts();
    });
    it('should call the getUsers function', () => {
      expect(getUsers).toHaveBeenCalledTimes(1);
    });
    it('should call the getPosts function', () => {
      expect(getPosts).toHaveBeenCalledTimes(1);
    });
  });
  describe('when the getUsers and getPosts functions are responding with a list of users and posts', () => {
    const firstUser = {
      id: 1,
      name: 'Short name',
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
    };
    const secondUser = {
      id: 2,
      name: 'Very long name',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      phone: '010-692-6593 x09125',
      website: 'anastasia.net',
    };
    const thirdUser = {
      id: 3,
      name: 'Medium name',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      phone: '1-463-123-4447',
      website: 'ramiro.info',
    };

    const firstUserPosts = [
      {
        userId: 1,
        id: 1,
        title: 'post 1',
        body: 'this is post 1',
      },
      {
        userId: 1,
        id: 2,
        title: 'post 2',
        body: 'this is post 2',
      },
    ];
    const secondUserPosts = [
      {
        userId: 2,
        id: 3,
        title: 'post 3',
        body: 'this is post 3',
      },
    ];
    const fifthUserPosts = [
      {
        userId: 5,
        id: 4,
        title: 'post 4',
        body: 'this is post 4',
      },
    ];
    beforeEach(() => {
      getUsers.mockResolvedValue([firstUser, secondUser, thirdUser]);
      getPosts.mockResolvedValue([
        ...firstUserPosts,
        ...secondUserPosts,
        ...fifthUserPosts,
      ]);
    });
    it('should return users with matching posts', async () => {
      const result = await getUsersWithPosts();
      expect(result[0]).toEqual({
        ...firstUser,
        posts: firstUserPosts,
      });
      expect(result[1]).toEqual({
        ...secondUser,
        posts: secondUserPosts,
      });
      expect(result[2]).toEqual({
        ...thirdUser,
        posts: [],
      });
    });
  });
  describe('when the getUsers or getPosts functions responds with an error', () => {
    beforeEach(() => {
      getUsers.mockImplementation(() => {
        throw new Error();
      });
    });
    it('should return an empty array', async () => {
      const result = await getUsersWithPosts();
      expect(result).toEqual([]);
    });
  });
});
