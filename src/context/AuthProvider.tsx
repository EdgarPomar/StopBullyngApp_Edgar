import React, { useEffect, useState } from 'react';
import { AuthContext, User } from './AuthContext';
import { getCurrentUser, logoutUser } from '../services/userService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    console.log('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
