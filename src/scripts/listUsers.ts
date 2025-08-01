// scripts/listUsers.ts
import { Client, Users } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID!)
  .setKey(process.env.VITE_APPWRITE_API_KEY!);

const users = new Users(client);

async function listAllUsers() {
  try {
    const res = await users.list();
    console.log('Usuarios:', res.users);
  } catch (error) {
    console.error('❌ Error al listar usuarios:', error);
  }
}

listAllUsers();
