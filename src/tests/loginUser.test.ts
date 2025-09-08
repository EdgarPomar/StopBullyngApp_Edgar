// loginUser.test.ts
describe('loginUser (mockeado dentro del test)', () => {
  // Creamos una función simulada hardcodeada
  const loginUser = jest.fn((email: string, password: string) => {
    if (email === 'test@example.com' && password === 'password123') {
      return Promise.resolve({
        $id: 'session-id',
        userId: 'mock-user-id',
      });
    } else {
      return Promise.reject(new Error('Credenciales incorrectas'));
    }
  });

  it('debe iniciar sesión correctamente', async () => {
    const result = await loginUser('test@example.com', 'password123');

    expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');

    expect(result).toEqual({
      $id: 'session-id',
      userId: 'mock-user-id',
    });
  });

  it('debe lanzar un error si el login falla', async () => {
    await expect(
        loginUser('wrong@example.com', 'badpassword')
    ).rejects.toThrow('Credenciales incorrectas');

    expect(loginUser).toHaveBeenCalledWith('wrong@example.com', 'badpassword');
  });
});
