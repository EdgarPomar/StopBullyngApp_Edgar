import React, { JSX } from 'react';
import { useAuth } from '../hooks/useAuth';

const AdminRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();

  console.log('Usuario actual:', user);

  if (user === null) {
    return <div>Cargando usuario...</div>;
  }

  if (!user.labels?.includes('admin')) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  return children;
};


export default AdminRoute;
