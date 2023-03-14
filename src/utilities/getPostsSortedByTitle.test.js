import { getPostsSortedByTitle } from './getPostsSortedByTitle';
import getPosts from './getPosts';

jest.mock('./getPosts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('The getPostsSortedByTitle function', () => {
  it('should call the getPosts function', () => {
    getPostsSortedByTitle();
    expect(getPosts).toHaveBeenCalled();
  });
  describe('when the getPosts function responds with a list of posts', () => {
    beforeEach(() => {
      getPosts.mockResolvedValue([
        {
          userId: 1,
          id: 1,
          title: 'Short title',
          body: 'Hello world!',
        },
        {
          userId: 1,
          id: 2,
          title: 'Very long title',
          body: 'Hello world!',
        },
        {
          userId: 2,
          id: 3,
          title: 'Medium title',
          body: 'Hello world!',
        },
      ]);
    });
    it('should return the posts sorted by the length of the title descending', async () => {
      const result = await getPostsSortedByTitle();

      expect(result[0].title).toBe('Very long title');
      expect(result[1].title).toBe('Medium title');
      expect(result[2].title).toBe('Short title');
    });
  });
  describe('when the getPosts function responds with an error', () => {
    beforeEach(() => {
      getPosts.mockImplementation(() => {
        throw new Error();
      });
    });
    it('should return an empty array', async () => {
      const result = await getPostsSortedByTitle();
      expect(result).toEqual([]);
    });
  });
});
