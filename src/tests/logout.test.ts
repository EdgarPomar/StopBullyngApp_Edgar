import { logoutUser } from '../services/userService';
import { account } from '../lib/appwrite';

jest.mock('../lib/appwrite', () => ({
  account: {
    deleteSession: jest.fn(),
  },
}));

describe('logoutUser', () => {
  it('debe llamar a account.deleteSession con "current"', async () => {
    const mockDeleteSession = account.deleteSession as jest.Mock;
    mockDeleteSession.mockResolvedValue({}); // simula éxito

    await logoutUser();

    expect(mockDeleteSession).toHaveBeenCalledWith('current');
  });
});
