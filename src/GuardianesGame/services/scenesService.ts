import { databases } from "../../lib/appwrite";
import { Scene } from "../types/sceneType";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const COLLECTION_ID_SCENES = import.meta.env.VITE_APPWRITE_COLLECTION_ID_SCENES!;

export const getScenes = async (): Promise<Scene[]> => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_SCENES);
    console.log("Escenas disponibles:", res.documents);
    return res.documents as unknown as Scene[];
  } catch (error) {
    console.error("Error al obtener escenas:", error);
    return [];
  }
};

export const getSceneById = async (sceneId: string): Promise<Scene | null> => {
  try {
    const res = await databases.getDocument(DATABASE_ID, COLLECTION_ID_SCENES, sceneId);
    return res as unknown as Scene;
  } catch (error) {
    console.error("Error al obtener la escena:", error);
    return null;
  }
};

// Nueva función que busca escena por id numérico
export const getSceneByNumericId = async (numericId: number): Promise<Scene | null> => {
  const scenes = await getScenes();
  console.log("IDs encontrados:", scenes.map(s => s.id));
  const foundScene = scenes.find(scene => scene.id === numericId);
  if (!foundScene) {
    console.error(`No se encontró escena con id numérico: ${numericId}`);
    return null;
  }
  return getSceneById(foundScene.$id);
};

