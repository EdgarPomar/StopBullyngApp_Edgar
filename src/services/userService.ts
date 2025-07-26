import { account, ID } from '../lib/appwrite';

/**
 * Registra un nuevo usuario con email, contraseña y nombre
 */
export const registerUser = (
  email: string,
  password: string,
  name: string
) => {
  return account.create(ID.unique(), email, password, name);
};

/**
 * Inicia sesión del usuario con email y contraseña
 */
export const loginUser = (email: string, password: string) => {
  return account.createEmailPasswordSession(email, password);
};

/**
 * Obtiene los datos del usuario autenticado actualmente
 */
export const getCurrentUser = () => {
  return account.get();
};

/**
 * Cierra la sesión actual del usuario
 */
export const logoutUser = () => {
  return account.deleteSession('current');
};
