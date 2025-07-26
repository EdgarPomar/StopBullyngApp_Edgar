import { loginUser } from '../services/userService';
import { account } from '../lib/appwrite';

jest.mock('../lib/appwrite', () => ({
  account: {
    createEmailPasswordSession: jest.fn(),
  },
}));

describe('loginUser', () => {
  it('debe iniciar sesión correctamente', async () => {
    // Simula una respuesta exitosa de Appwrite
    (account.createEmailPasswordSession as jest.Mock).mockResolvedValue({
      $id: 'session-id',
      userId: 'mock-user-id',
    });

    const result = await loginUser('test@example.com', 'password123');

    expect(account.createEmailPasswordSession).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );

    expect(result).toEqual({
      $id: 'session-id',
      userId: 'mock-user-id',
    });
  });

  it('debe lanzar un error si el login falla', async () => {
    (account.createEmailPasswordSession as jest.Mock).mockRejectedValue(
      new Error('Credenciales incorrectas')
    );

    await expect(
      loginUser('wrong@example.com', 'badpassword')
    ).rejects.toThrow('Credenciales incorrectas');
  });
});
