import { account, ID } from '../lib/appwrite';

export const registerUser = (email: string, password: string, name: string) => {
  return account.create(ID.unique(), email, password, name);
};

export const loginUser = (email: string, password: string) => {
  return account.createSession(email, password);
};

export const getCurrentUser = () => {
  return account.get();
};

export const logoutUser = () => {
  return account.deleteSession('current');
};
