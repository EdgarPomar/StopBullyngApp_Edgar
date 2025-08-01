import { account, databases, ID, Query } from '../lib/appwrite';
import { User } from '../context/AuthContext';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS!;

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const user = await account.create(ID.unique(), email, password, name);

  await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    userId: user.$id,
    name: user.name,
    email: user.email,
    role: 'user'
  });

  return user;
};

export const loginUser = (email: string, password: string) => {
  return account.createEmailPasswordSession(email, password);
};

export const getCurrentUser = async (): Promise<User> => {
  const res = await account.get();

  let role: string | undefined = undefined;

  try {
    const docs = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('userId', res.$id),
      Query.limit(1),
    ]);
    if (docs.total > 0) {
      role = docs.documents[0].role;
    }
  } catch (error) {
    console.warn('No se pudo obtener el rol desde la colección:', error);
  }

  return {
    $id: res.$id,
    name: res.name,
    email: res.email,
    role,
    labels: Array.isArray(res.labels) ? res.labels : [],
  };
};

export const logoutUser = () => {
  return account.deleteSession('current');
};
