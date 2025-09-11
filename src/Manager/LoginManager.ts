import {Usuario} from "../types/userType.ts";
import {databases, Query} from "../lib/appwrite.ts";

export class LoginManager {

    static async getUsersAsync() : Promise<Usuario[]> {
        /*select * from users*/
        try {
            const response = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS
            );

            const users: Usuario[] = response.documents.map(doc => ({
                $id: doc.$id,
                userId: doc.userId,
                name: doc.name,
                email: doc.email,
                role: doc?.role,
                hashedPassword: doc?.hashedPassword,
                labels: Array.isArray(doc.labels) ? doc.labels : [],
            }));

            return users;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getUserAsync(userid: string) : Promise<Usuario | null> {
        /*select * from users where userid = @p1*/
        try {
            const user = await databases.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
                userid);

            const userInstance: Usuario = {
                $id: user.$id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user?.role,
                hashedpassword: user?.hashedpassword,
                labels: Array.isArray(user.labels) ? user.labels : [],
            };

            console.log(userInstance);
            return userInstance;

        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async deleteUserAsync(userid: string) : Promise<boolean>  {
        try {
            await databases.deleteDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
                userid
            );
            console.log("Documento eliminado con éxito");
            return true;
        } catch (error) {
            console.error("Error eliminando documento:", error);
            return false;
        }
    }

    static async updateUserAsync(userid: string, updatedData :Usuario | any) : Promise<boolean> {
        /*Update role,name,email set Role = @p0, name=@p1, email=@p2 from Users where userid=@x*/
        try {
            await databases.updateDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
                userid,
                updatedData
            );
            console.log("Documento actualizado con éxito");
            return true;
        } catch (error) {
            console.error("Error actualizando documento:", error);
            return false;
        }
    }

    static async createUserAsync(newuser: Usuario): Promise<boolean> {
        /*INSERT INTO users (name,email,role, hashespassword) VALUES(@p0,@p1,@p2,@p3);*/
        try {
            if(newuser.hashedpassword == null) {
                throw new Error("Password is required");
            }

            await databases.createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS,
                newuser.$id,
                {
                    name: newuser.name,
                    email: newuser.email,
                    userId: newuser.userId,
                    role: newuser.role,
                    hashedpassword: newuser.hashedpassword!,
                    labels: newuser.labels || [],
                }
            );
            return true; // éxito
        } catch (error) {
            console.error('Error creando usuario:', error);
            return false; // fallo
        }
    }

    static async getCurrentUserAsync(userid: string): Promise<Usuario | null> {
        /*SELECT * FROM Usuarios WHERE userId = ? LIMIT 1*/
        /*El atribut userId busca por una columna de tu tabla (no por el $id del documento)*/
        try {
            const docs = await databases.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID!,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS!,
                [Query.equal("userId", userid), Query.limit(1)]
            );

            if (docs.total === 0) {
                return null;
            }

            const doc = docs.documents[0];

            const userInstance: Usuario = {
                $id: doc.$id,
                userId: doc.userId,
                name: doc.name,
                email: doc.email,
                role: doc?.role,
                hashedpassword: doc?.hashedpassword,
                labels: Array.isArray(doc.labels) ? doc.labels : [],
            };

            console.log("✅ Usuario encontrado:", userInstance);
            return userInstance;
        } catch (error) {
            console.error("❌ Error obteniendo usuario:", error);
            return null;
        }
    }
}