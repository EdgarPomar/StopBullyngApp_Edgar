import { createContext } from 'react';

export type User = {
  $id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  labels?: string[];
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: async () => {},
});
