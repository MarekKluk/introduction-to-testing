import { getAlbums } from './getAlbums';
import { getPhotos } from './getPhotos';
import { getAlbumsWithPhotos } from './getAlbumsWithPhotos';

jest.mock('./getAlbums', () => {
  return {
    getAlbums: jest.fn(),
  };
});
jest.mock('./getPhotos', () => {
  return {
    getPhotos: jest.fn(),
  };
});

describe('The getAlbumsWithPhotos function', () => {
  describe('when the getAlbumsWithPhotos function is called', () => {
    beforeEach(async () => {
      await getAlbumsWithPhotos();
    });
    it('should call the getAlbums function', () => {
      expect(getAlbums).toHaveBeenCalledTimes(1);
    });
    it('should call the getPhotos function', () => {
      expect(getPhotos).toHaveBeenCalledTimes(1);
    });
  });
  describe('when the getAlbums and getPhotos functions are responding with a list of albums and photos', () => {
    const firstAlbum = {
      userId: 1,
      id: 1,
      title: 'Medium title',
    };
    const secondAlbum = {
      userId: 1,
      id: 2,
      title: 'Short title',
    };
    const thirdAlbum = {
      userId: 3,
      id: 3,
      title: 'Very long title',
    };
    const firstAlbumsPhotos = [
      {
        albumId: 1,
        id: 1,
        title: 'Photo 1',
        url: 'https://via.placeholder.com/600/92c9524234',
        thumbnailUrl: 'https://via.placeholder.com/150/92c952',
      },
      {
        albumId: 1,
        id: 2,
        title: 'Photo 2',
        url: 'https://via.placeholder.com/600/771796',
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
      },
    ];
    const secondAlbumsPhotos = [
      {
        albumId: 2,
        id: 3,
        title: 'Photo 3',
        url: 'https://via.placeholder.com/600/24f355',
        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
      },
    ];
    const fifthAlbumsPhotos = [
      {
        albumId: 5,
        id: 4,
        title: 'Photo 4',
        url: 'https://via.placeholder.com/600/d32776',
        thumbnailUrl: 'https://via.placeholder.com/150/d32776',
      },
    ];

    beforeEach(() => {
      getAlbums.mockResolvedValue([firstAlbum, secondAlbum, thirdAlbum]);
      getPhotos.mockResolvedValue([
        ...firstAlbumsPhotos,
        ...secondAlbumsPhotos,
        ...fifthAlbumsPhotos,
      ]);
    });
    it('should return albums with matching Photos', async () => {
      const result = await getAlbumsWithPhotos();
      expect(result[0]).toEqual({
        ...firstAlbum,
        photos: firstAlbumsPhotos,
      });
      expect(result[1]).toEqual({
        ...secondAlbum,
        photos: secondAlbumsPhotos,
      });
      expect(result[2]).toEqual({
        ...thirdAlbum,
        photos: [],
      });
    });
    describe('when the getAlbums or getPhotos functions responds with an error', () => {
      beforeEach(() => {
        getAlbums.mockImplementation(() => {
          throw new Error();
        });
      });
      it('should return an empty array', async () => {
        const result = await getAlbumsWithPhotos();
        expect(result).toEqual([]);
      });
    });
  });
});
