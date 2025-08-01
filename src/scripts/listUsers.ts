import { Client, Account } from 'appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT!)  // tu endpoint
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID!);  // tu proyecto

// Ya no se usa setKey en Client directamente

const account = new Account(client);

async function getAccount() {
  try {
    const res = await account.get();
    console.log('Usuario autenticado:', res);
  } catch (err) {
    console.error('Error al obtener usuario:', err);
  }
}

getAccount();
