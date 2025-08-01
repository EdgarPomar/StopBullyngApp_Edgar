import React, { useEffect, useState, useContext } from 'react';
import { databases } from '../lib/appwrite';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS;
console.log('Base de datos Id: ', DATABASE_ID);
console.log('Colección Id', COLLECTION_ID);
type Usuario = {
  $id: string;
  name: string;
  email: string;
  role?: string;
  labels?: string[];
};

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        console.log(response);
        setUsuarios(response.documents as unknown as Usuario[]);
      } catch (err) {
        console.error(err);
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };

    if (user?.labels?.includes('admin')) {
      fetchUsuarios();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) return <p>No autorizado. Inicia sesión.</p>;
  if (!user.labels?.includes('admin')) return <p>No tienes permiso para acceder al dashboard.</p>;

  return (
    <div className={styles.container}>
      <h1>Panel de Administración</h1>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && usuarios.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.$id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
