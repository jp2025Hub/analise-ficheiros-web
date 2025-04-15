/**
 * Extrai a versão de um ficheiro PDF a partir dos primeiros bytes.
 *
 * @param {ArrayBuffer} buffer - Conteúdo do ficheiro.
 * @returns {string} Versão do PDF (ex: "PDF 1.4") ou "Desconhecido".
 */
export function getPdfVersion(buffer) {
  const text = new TextDecoder().decode(buffer.slice(0, 10))
  const match = text.match(/%PDF-(\d\.\d)/)
  return match ? `PDF ${match[1]}` : 'Desconhecido'
}

/**
 * Obtém as dimensões (largura x altura) de um ficheiro PNG.
 *
 * @param {ArrayBuffer} buffer - Conteúdo binário do ficheiro PNG.
 * @returns {string} Dimensões no formato "Largura x Altura px".
 */
export function getPngDimensions(buffer) {
  const view = new DataView(buffer)
  const width = view.getUint32(16)
  const height = view.getUint32(20)
  return `${width} x ${height} px`
}

/**
 * Extrai informações ID3v1 de um ficheiro MP3, como título e artista.
 *
 * @param {ArrayBuffer} buffer - Conteúdo binário do ficheiro MP3.
 * @returns {{ title: string, artist: string }} Objeto com título e artista ou "Desconhecido".
 */
export function getMp3Info(buffer) {
  const bytes = new Uint8Array(buffer)

  if (bytes.length < 128) {
    return { title: 'Desconhecido', artist: 'Desconhecido' }
  }

  const tag = bytes.slice(bytes.length - 128)
  const title = new TextDecoder().decode(tag.slice(3, 33)).trim()
  const artist = new TextDecoder().decode(tag.slice(33, 63)).trim()

  return {
    title: title || 'Desconhecido',
    artist: artist || 'Desconhecido'
  }
}
