
import { databases, Query } from "../../lib/appwrite";
import { Reflexion } from "../types/reflectionType";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID_REFLEXIONES = import.meta.env.VITE_APPWRITE_COLLECTION_ID_REFLECTIONS!;

export const getReflexiones = async (): Promise<Reflexion[]> => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_REFLEXIONES);
    return res.documents as unknown as Reflexion[];
  } catch (error) {
    console.error("Error al obtener reflexiones:", error);
    return [];
  }
};

//returns 1 option
export const getReflexionesByEscena = async (escenaId: string): Promise<Reflexion[]> => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_REFLEXIONES, [
      // Filtrar por campo escenaId

      Query.equal("escenaId", escenaId),


    ]);
    return res.documents as unknown as Reflexion[];
  } catch (error) {
    console.error("Error al obtener reflexiones por escena:", error);
    return [];
  }
};

//returns multiple choice options
export const getReflexionesByEscenaPrefix = async (escenaIndex: string): Promise<Reflexion[]> => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_REFLEXIONES, [
      Query.startsWith("escenaId", escenaIndex) // Ejemplo: numero = "1"
    ]);

    const filtered = res.documents.filter(doc => new RegExp(`^${escenaIndex}[A-Z]$`).test(doc.escenaId));
    return filtered as unknown as Reflexion[];

  } catch (error) {
    console.error("Error al obtener reflexiones por escena:", error);
    return [];
  }
};

