import { getRandomMonth } from './getRandomMonth';
import { getRandomNumberInRange } from './getRandomNumberInRange';

jest.mock('./getRandomNumberInRange', () => {
  return {
    getRandomNumberInRange: jest.fn(),
  };
});

describe('The getRandomMonth function', () => {
  describe('when the getRandomMonth function is called', () => {
    it('should call the the getRandomNumberInRange with correct arguments', () => {
      getRandomMonth();
      expect(getRandomNumberInRange).toHaveBeenCalledWith(0, 11);
    });
  });
  describe('when the getRandomNumberInRange is provided with correct arguments', () => {
    it('should return January when getRandomNumberInRange returns 0', () => {
      getRandomNumberInRange.mockReturnValue(0);
      expect(getRandomMonth()).toBe('January');
    });
    it('should return February when getRandomNumberInRange returns 1', () => {
      getRandomNumberInRange.mockReturnValue(1);
      expect(getRandomMonth()).toBe('February');
    });
    it('should return February when getRandomNumberInRange returns 2', () => {
      getRandomNumberInRange.mockReturnValue(2);
      expect(getRandomMonth()).toBe('March');
    });
    it('should return April when getRandomNumberInRange returns 3', () => {
      getRandomNumberInRange.mockReturnValue(3);
      expect(getRandomMonth()).toBe('April');
    });

    it('should return May when getRandomNumberInRange returns 4', () => {
      getRandomNumberInRange.mockReturnValue(4);
      expect(getRandomMonth()).toBe('May');
    });

    it('should return June when getRandomNumberInRange returns 5', () => {
      getRandomNumberInRange.mockReturnValue(5);
      expect(getRandomMonth()).toBe('June');
    });

    it('should return July when getRandomNumberInRange returns 6', () => {
      getRandomNumberInRange.mockReturnValue(6);
      expect(getRandomMonth()).toBe('July');
    });

    it('should return August when getRandomNumberInRange returns 7', () => {
      getRandomNumberInRange.mockReturnValue(7);
      expect(getRandomMonth()).toBe('August');
    });

    it('should return September when getRandomNumberInRange returns 8', () => {
      getRandomNumberInRange.mockReturnValue(8);
      expect(getRandomMonth()).toBe('September');
    });

    it('should return October when getRandomNumberInRange returns 9', () => {
      getRandomNumberInRange.mockReturnValue(9);
      expect(getRandomMonth()).toBe('October');
    });

    it('should return November when getRandomNumberInRange returns 10', () => {
      getRandomNumberInRange.mockReturnValue(10);
      expect(getRandomMonth()).toBe('November');
    });

    it('should return December when getRandomNumberInRange returns 11', () => {
      getRandomNumberInRange.mockReturnValue(11);
      expect(getRandomMonth()).toBe('December');
    });
  });
});
