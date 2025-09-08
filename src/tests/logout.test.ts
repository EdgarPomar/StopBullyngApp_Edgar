describe('logoutUser (mockeado dentro del test)', () => {
  // Creamos una función simulada
  const logoutUser = jest.fn(() => Promise.resolve({}));

  it('debe llamar a logoutUser y resolver', async () => {
    await logoutUser();

    // Verifica que se haya llamado
    expect(logoutUser).toHaveBeenCalled();
  });
});
