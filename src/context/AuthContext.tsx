import { createContext } from 'react';

export type User = {
  $id: string;
  userId: string;
  name: string;
  email: string;
  role?: string;
  hashedpassword?: string;
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
