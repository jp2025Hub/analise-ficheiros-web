/**
 * Gera um hash criptográfico (SHA-1, SHA-256, SHA-512, etc.) para um buffer binário.
 *
 * @param {ArrayBuffer} buffer - Conteúdo do ficheiro em formato binário.
 * @param {string} [algorithm='SHA-256'] - Algoritmo de hash a usar (por exemplo, 'SHA-256').
 * @returns {Promise<string>} Hash em formato hexadecimal ou mensagem de erro.
 */
export async function generateHash(buffer, algorithm = 'SHA-256') {
  if (!buffer) return ''

  try {
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } catch (err) {
    console.error(`Erro ao gerar hash (${algorithm}):`, err)
    return 'Erro ao gerar hash'
  }
}
