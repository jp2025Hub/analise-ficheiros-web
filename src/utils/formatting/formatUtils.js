/**
 * Converte um valor em bytes para um formato legível (ex: 1.5 MB).
 * @param {number} bytes - O número de bytes.
 * @param {number} [decimals=2] - Número de casas decimais a apresentar.
 * @returns {string} Tamanho formatado.
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * Formata uma data em milissegundos para um formato local legível
 * @param {number} timestamp - Timestamp em milissegundos.
 * @returns {string} Data formatada.
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Torna um tipo MIME mais legível para apresentação.
 * @param {string} mime - Tipo MIME bruto (ex: "text/plain").
 * @returns {string} Tipo formatado (ex: "Text (plain)").
 */
export function formatMimeType(mime) {
  if (!mime || mime === 'Desconhecido') return 'Desconhecido'
  const [type, subtype] = mime.split('/')
  return `${type.charAt(0).toUpperCase() + type.slice(1)} (${subtype})`
}
