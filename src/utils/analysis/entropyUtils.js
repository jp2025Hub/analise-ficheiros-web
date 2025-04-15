/**
 * Calcula a entropia de um buffer em bits por byte.
 * A entropia mede a aleatoriedade dos dados (0 = repetitivo, 8 = completamente aleatório).
 *
 * @param {ArrayBuffer} buffer - Conteúdo binário a analisar.
 * @returns {string} Entropia com 4 casas decimais (string formatada).
 */
export function calculateEntropy(buffer) {
  if (!buffer || buffer.byteLength === 0) return '0.0000'

  const byteArray = new Uint8Array(buffer)
  const freq = new Array(256).fill(0)

  for (const byte of byteArray) {
    freq[byte]++
  }

  const total = byteArray.length
  let entropy = 0

  for (const count of freq) {
    if (count === 0) continue
    const p = count / total
    entropy -= p * Math.log2(p)
  }

  return entropy.toFixed(4)
}

/**
 * Divide um buffer em blocos e calcula a entropia individual de cada bloco.
 *
 * @param {ArrayBuffer} buffer - Conteúdo binário a analisar.
 * @param {number} [blockSize=256] - Tamanho de cada bloco em bytes.
 * @returns {number[]} Array de valores de entropia por bloco.
 */
export function calculateBlockEntropy(buffer, blockSize = 256) {
  const byteArray = new Uint8Array(buffer)
  const blocks = []

  for (let i = 0; i < byteArray.length; i += blockSize) {
    const slice = byteArray.slice(i, i + blockSize)
    const entropy = calculateEntropy(slice.buffer)
    blocks.push(parseFloat(entropy))
  }

  return blocks
}
