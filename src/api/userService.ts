import { account, databases, ID, Query } from './appwrite';

const databaseId = 'default'; // Cambia si tu DB tiene otro ID
const usersCollectionId = 'users'; // ID de la colección de usuarios

/**
 * Registra un nuevo usuario en Appwrite Auth y en la DB con rol "user"
 */
export async function registerUser(email: string, password: string, name: string) {
  try {
    // Crear usuario en Appwrite Auth
    const user = await account.create(ID.unique(), email, password, name);

    // Iniciar sesión automáticamente
    await account.createSession(email, password);

    // Crear documento en la colección con rol "user"
    await databases.createDocument(databaseId, usersCollectionId, user.$id, {
      userId: user.$id,
      email: user.email,
      role: 'user'
    });

    return user;
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
}

/**
 * Inicia sesión con email y contraseña
 */
export async function loginUser(email: string, password: string) {
  try {
    return await account.createSession(email, password);
  } catch (error) {
    console.error('Error en loginUser:', error);
    throw error;
  }
}

/**
 * Cierra la sesión actual
 */
export async function logoutUser() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error en logoutUser:', error);
    throw error;
  }
}

/**
 * Obtiene el perfil de usuario desde la colección (incluye rol)
 */
export async function getUserProfile(userId: string) {
  try {
    return await databases.getDocument(databaseId, usersCollectionId, userId);
  } catch (error) {
    console.error('Error en getUserProfile:', error);
    throw error;
  }
}

/**
 * Lista todos los usuarios (solo para admins)
 */
export async function listUsers() {
  try {
    return await databases.listDocuments(databaseId, usersCollectionId);
  } catch (error) {
    console.error('Error en listUsers:', error);
    throw error;
  }
}

/**
 * Cambia el rol de un usuario a "admin" o "user"
 * Máximo 2 administradores permitidos
 */
export async function changeUserRole(userId: string, newRole: 'admin' | 'user') {
  try {
    // Contar cuántos admins hay actualmente
    const admins = await databases.listDocuments(databaseId, usersCollectionId, [
      Query.equal('role', 'admin')
    ]);

    if (newRole === 'admin' && admins.total >= 2) {
      throw new Error('No se pueden tener más de 2 administradores.');
    }

    return await databases.updateDocument(databaseId, usersCollectionId, userId, {
      role: newRole
    });
  } catch (error) {
    console.error('Error en changeUserRole:', error);
    throw error;
  }
}

/**
 * Elimina un usuario de la colección y Auth
 */
export async function deleteUser(userId: string) {
  try {
    // Borra de la colección
    await databases.deleteDocument(databaseId, usersCollectionId, userId);

    // Borra de Auth (solo admins deberían hacer esto)
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error('Error en deleteUser:', error);
    throw error;
  }
}
