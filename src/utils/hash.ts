export async function generarHashSHA512(texto: string): Promise<string> {
    // Convertir el texto a un Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);

    // Generar el hash SHA-512
    const hashBuffer = await crypto.subtle.digest('SHA-512', data);

    // Convertir a hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
}
