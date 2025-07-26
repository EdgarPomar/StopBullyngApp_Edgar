import { registerUser } from '../services/userService';
import { account } from '../lib/appwrite';

// Mocks de Appwrite
jest.mock('../lib/appwrite', () => ({
  account: {
    create: jest.fn(),
  },
  ID: {
    unique: () => 'mock-id',
  },
}));

describe('registerUser', () => {
  it('debe llamar a account.create con los argumentos correctos', async () => {
    const mockCreate = account.create as jest.Mock;

    // Simula una respuesta exitosa
    mockCreate.mockResolvedValue({
      $id: 'mock-id',
      email: 'test@example.com',
      name: 'Usuario Test',
    });

    const result = await registerUser('test@example.com', '123456', 'Usuario Test');

    expect(account.create).toHaveBeenCalledWith(
      'mock-id',
      'test@example.com',
      '123456',
      'Usuario Test'
    );

    expect(result).toEqual({
      $id: 'mock-id',
      email: 'test@example.com',
      name: 'Usuario Test',
    });
  });
});
