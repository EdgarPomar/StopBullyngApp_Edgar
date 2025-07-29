// services/userService.ts
import { account, ID } from '../lib/appwrite';
import { User } from '../context/AuthContext';

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
export const getCurrentUser = async (): Promise<User> => {
  const res = await account.get();

  console.log('Respuesta cruda desde Appwrite:', res);

  return {
    $id: res.$id,
    name: res.name,
    email: res.email,
    labels: res.labels ?? [],
  };
};

/**
 * Cierra la sesión actual del usuario
 */
export const logoutUser = () => {
  return account.deleteSession('current');
};
