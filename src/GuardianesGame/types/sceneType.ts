export interface Scene {
  $id: string;         // ID del documento en Appwrite
  pregunta: string;    // Texto de la pregunta
  opciones: string[];  // Lista de opciones
  correcta: number;    // Índice de la opción correcta
  id: number;          // ID numérico interno
}
