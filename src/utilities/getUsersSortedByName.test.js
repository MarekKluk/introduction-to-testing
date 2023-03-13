import { getUsersSortedByName } from './getUsersSortedByName';
import getUsers from './getUsers';

jest.mock('./getUsers', () => ({
	default: jest.fn(),
	__esModule: true
}));

describe('The getUsersSortedByName function', () => {
	it('should call the getUsers function', () => {
		getUsersSortedByName();
		expect(getUsers).toHaveBeenCalledTimes(1);
	})
	describe('When the getUsers function responds with a list of users', () => {
		beforeEach(() => {
			getUsers.mockResolvedValue([
				{
					id: 1,
					name: 'Short name',
					username: 'Bret',
					email: 'Sincere@april.biz',
					phone: '1-770-736-8031 x56442',
					website: 'hildegard.org',
				},
				{
					id: 2,
					name: 'Very long name',
					username: 'Antonette',
					email: 'Shanna@melissa.tv',
					phone: '010-692-6593 x09125',
					website: 'anastasia.net',
				},
				{
					id: 3,
					name: 'Medium name',
					username: 'Samantha',
					email: 'Nathan@yesenia.net',
					phone: '1-463-123-4447',
					website: 'ramiro.info',
				},
			]);
		});
		it('should return users sorted by name length descending', async () => {
			const result = await getUsersSortedByName();
			expect(result[0].name).toBe('Very long name');
			expect(result[1].name).toBe('Medium name');
			expect(result[2].name).toBe('Short name');
		});
	});
	describe('When the getUsers function responds with an error', () => {
		beforeEach(() => {
			getUsers.mockImplementation(() => {
				throw new Error();
			});
		});
		it('should return an empty array', async () => {
			const result = await getUsersSortedByName();
			expect(result).toEqual([]);
		});
	});
});
