import { getPhotosSortedByTitle } from './getPhotosSortedByTitle';
import { getPhotos } from './getPhotos';

jest.mock('./getPhotos', () => ({
  getPhotos: jest.fn(),
}));

describe('The getPhotosSortedByTitle function', () => {
  it('should call the getPhotos function', () => {
    getPhotosSortedByTitle();
    expect(getPhotos).toHaveBeenCalled();
  });
  describe('when the getPhotos function responds with a list of posts', () => {
    beforeEach(() => {
      getPhotos.mockResolvedValue([
        {
          albumId: 1,
          id: 1,
          title: 'Short title',
          url: 'https://via.placeholder.com/600/92c9524234',
        },
        {
          albumId: 1,
          id: 2,
          title: 'Very long title',
          url: 'https://via.placeholder.com/600/92c952111',
        },
        {
          albumId: 2,
          id: 3,
          title: 'Medium title',
          url: 'https://via.placeholder.com/600/92c952222222',
        },
      ]);
    });
    it('should return the photos sorted by the length of the title descending', async () => {
      const result = await getPhotosSortedByTitle();

      expect(result[0].title).toBe('Very long title');
      expect(result[1].title).toBe('Medium title');
      expect(result[2].title).toBe('Short title');
    });
  });
  describe('when the getPhotos function responds with an error', () => {
    beforeEach(() => {
      getPhotos.mockImplementation(() => {
        throw new Error();
      });
    });
    it('should return an empty array', async () => {
      const result = await getPhotosSortedByTitle();
      expect(result).toEqual([]);
    });
  });
});
