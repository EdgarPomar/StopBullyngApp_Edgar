import { account, databases, ID } from "../lib/appwrite";
import {generarHashSHA512} from "../utils/hash.ts";
import {Models} from "appwrite";

const REGISTER_BOT_EMAIL = import.meta.env.VITE_REGISTER_BOT_EMAIL!;
const REGISTER_BOT_PASSWORD = import.meta.env.VITE_REGISTER_BOT_PASSWORD!;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS!;

/**
 * Inicia sesión del RegisterBot
 */
export async function loginRegisterBot(): Promise<Models.Session | null> {
    try {
        const session:Models.Session = await account.createEmailPasswordSession(
            REGISTER_BOT_EMAIL,
            REGISTER_BOT_PASSWORD
        );
        console.log("✅ RegisterBot logueado:", session);


        return session;
    } catch (err) {
        console.error("❌ Error login RegisterBot:", err);
        throw err;
        return null;
    }
};

/**
 * Cierra sesión del RegisterBot
 */
export const logoutRegisterBot = async () => {
    try {
        await account.deleteSession("current");
        console.log("👋 RegisterBot desconectado");
    } catch (err) {
        console.error("❌ Error cerrando sesión RegisterBot:", err);
    }
};

/**
 * Registra un nuevo usuario/bot en la base de datos con contraseña SHA-512
 */
export const registerBotUser = async (email: string, password: string, name: string) => {
    try {
        // 1️⃣ Login del bot
        await loginRegisterBot();

        // 2️⃣ Generar hash SHA-512 de la contraseña
        const hashedPassword = await generarHashSHA512(password);

        // 3️⃣ Crear documento en la base de datos
        const newBotUser = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                name,
                email,
                password: hashedPassword,
                role: "bot",
            }
        );

        console.log("✅ Bot/usuario registrado con éxito:", newBotUser);

        // 4️⃣ Logout del bot
        await logoutRegisterBot();

        return newBotUser;
    } catch (error) {
        console.error("❌ Error registrando bot/usuario:", error);
        throw error;
    }
};
