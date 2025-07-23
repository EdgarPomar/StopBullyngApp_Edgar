// src/api/appwrite.ts
import { Client, Account, Databases, ID, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)  // Cambia esto por la URL de tu servidor Appwrite
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);                // Cambia esto por el ID de tu proyecto Appwrite

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client); //opcional

// Exporta también ID si quieres usar IDs únicos para documentos
export { ID };
