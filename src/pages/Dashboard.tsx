import React, { useEffect, useState, useContext } from 'react';
import { databases } from '../lib/appwrite';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/Dashboard.module.css';
import { Usuario } from '../types/userType';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS!;

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setUsuarios(response.documents as unknown as Usuario[]);
      } catch (err) {
        console.error('[❌] Error al obtener los usuarios:', err);
        setError('Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin' || user?.labels?.includes('admin')) {
      fetchUsuarios();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleEditClick = (usuario: Usuario) => {
    setEditingUser(usuario);
    setFormData({
      name: usuario.name,
      email: usuario.email,
      role: usuario.name === 'Edgar Pomar' ? 'admin' : usuario.role || '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'role' && editingUser?.name === 'Edgar Pomar' ? 'admin' : value,
    }));
  };

  const handleSave = async () => {
    if (!editingUser) return;

    const updatedData = {
      ...formData,
      role: editingUser.name === 'Edgar Pomar' ? 'admin' : formData.role,
    };

    try {
      const updatedUser = await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editingUser.$id,
          updatedData
      );
      setUsuarios((prev) =>
          prev.map((u) => (u.$id === editingUser.$id ? (updatedUser as unknown as Usuario) : u))
      );
      setEditingUser(null);
      console.log('[✔] Usuario actualizado:', updatedUser);
    } catch (err) {
      console.error('[❌] Error al actualizar usuario:', err);
      setError('Error al actualizar usuario');
    }
  };

  const handleDelete = async (usuario: Usuario) => {
    if (!confirm(`¿Seguro que deseas eliminar a ${usuario.name}?`)) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, usuario.$id);
      setUsuarios(usuarios.filter((u) => u.$id !== usuario.$id));
    } catch (err) {
      console.error('[❌] Error al eliminar usuario:', err);
      setError('Error al eliminar usuario');
    }
  };

  if (!user) return <p>No autorizado. Inicia sesión.</p>;
  if (!(user.role === 'admin' || user.labels?.includes('admin'))) {
    return <p>No tienes permiso para acceder al dashboard.</p>;
  }

  return (
      <div className={styles.container}>
        <h1>Panel de Administración</h1>

        {loading && <p>Cargando usuarios...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && usuarios.length > 0 ? (
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              {usuarios.map((u) => (
                  <tr key={u.$id}>
                    <td data-label="Nombre">{u.name}</td>
                    <td data-label="Email">{u.email}</td>
                    <td data-label="Rol">{u.role || 'N/A'}</td>
                    <td data-label="Acciones">
                      <button className={styles.editButton} onClick={() => handleEditClick(u)}>Editar</button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(u)}>Borrar</button>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        ) : (
            !loading && <p>No hay usuarios para mostrar.</p>
        )}

        {/* Modal de edición */}
        {editingUser && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Editar usuario</h2>
                <label>
                  Nombre:
                  <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                  />
                </label>
                <label>
                  Email:
                  <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                </label>
                <label>
                  Rol:
                  <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      disabled={editingUser.name === 'Edgar Pomar'}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <div className={styles.modalActions}>
                  <button onClick={handleSave}>Guardar</button>
                  <button onClick={() => setEditingUser(null)}>Cancelar</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default Dashboard;
