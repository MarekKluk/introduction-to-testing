import { getAlbumsSortedByTitle } from './getAlbumsSortedByTitle';
import { getAlbums } from './getAlbums';

jest.mock('./getAlbums', () => ({
  getAlbums: jest.fn(),
}));

describe('The getAlbumsSortedByTitle function', () => {
  it('should call the getAlbums function', () => {
    getAlbumsSortedByTitle();
    expect(getAlbums).toHaveBeenCalled();
  });
  describe('when the getAlbums function responds with a list of albums', () => {
    beforeEach(() => {
      getAlbums.mockResolvedValue([
        {
          userId: 1,
          id: 1,
          title: 'Medium title',
        },
        {
          userId: 1,
          id: 2,
          title: 'Short title',
        },
        {
          userId: 3,
          id: 3,
          title: 'Very long title',
        },
      ]);
    });
    it('should return the albums sorted by the length of the title descending', async () => {
      const result = await getAlbumsSortedByTitle();

      expect(result[0].title).toBe('Very long title');
      expect(result[1].title).toBe('Medium title');
      expect(result[2].title).toBe('Short title');
    });
  });
  describe('when the getAlbums function responds with an error', () => {
    beforeEach(() => {
      getAlbums.mockImplementation(() => {
        throw new Error();
      });
    });
    it('should return an empty array', async () => {
      const result = await getAlbumsSortedByTitle();
      expect(result).toEqual([]);
    });
  });
});
