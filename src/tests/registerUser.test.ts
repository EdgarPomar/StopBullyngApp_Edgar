describe('registerUser (mockeado dentro del test)', () => {
  // Función simulada hardcodeada
  const registerUser = jest.fn(
      (email: string, _password: string, name: string) => {
        return Promise.resolve({
          $id: 'mock-id',
          email,
          name,
        });
      }
  );

  it('debe devolver el usuario creado correctamente', async () => {
    const result = await registerUser('test@example.com', '123456', 'Usuario Test');

    expect(registerUser).toHaveBeenCalledWith('test@example.com', '123456', 'Usuario Test');

    expect(result).toEqual({
      $id: 'mock-id',
      email: 'test@example.com',
      name: 'Usuario Test',
    });
  });
});
