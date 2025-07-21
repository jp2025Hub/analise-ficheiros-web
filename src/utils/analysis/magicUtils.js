// src/utils/analysis/magicUtils.js

import { fileSignatures } from '../../components/data/fileSignatures'

/**
 * Extrai os primeiros bytes de um ficheiro (em formato hexadecimal sem espaços).
 *
 * @param {ArrayBuffer} buffer - O conteúdo binário do ficheiro.
 * @param {number} [length=12] - Número de bytes a extrair (quanto mais, mais fiável).
 * @returns {string} Cadeia hexadecimal (sem espaços) dos bytes extraídos.
 */
export function getMagicNumber(buffer, length = 12) {
  const view = new Uint8Array(buffer).slice(0, length)
  return Array.from(view)
    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
    .join('')
}

/**
 * Tenta detetar o tipo real de um ficheiro com base na assinatura mágica,
 * conteúdo textual e extensão do nome do ficheiro.
 *
 * @param {string} magic - Assinatura mágica extraída (hexadecimal sem espaços).
 * @param {ArrayBuffer|null} [buffer=null] - Buffer do conteúdo para heurística textual.
 * @param {File|null} [file=null] - Objeto File para heurística com extensão.
 * @returns {string} Tipo identificado ou "Desconhecido".
 */
export function detectFileTypeByMagic(magic, buffer = null, file = null) {
  if (!magic) return 'Desconhecido'

  const normalizado = magic.toUpperCase()

  // 1. Verificar com base na base de dados de assinaturas
  const match = fileSignatures.find(sig => normalizado.startsWith(sig.hex))
  if (match) return match.type

  // 2. Heurística por conteúdo (texto legível)
  if (buffer) {
    const text = new TextDecoder().decode(buffer.slice(0, 64))
  // eslint-disable-next-line no-control-regex
  const isAscii = /^[\x09\x0A\x0D\x20-\x7E]+$/.test(text) // inclui tabs e quebras de linha
    if (isAscii) return 'Texto ASCII'
  }

  // 3. Heurística por extensão de ficheiro
  if (file?.name) {
    const ext = file.name.split('.').pop().toLowerCase()
    const extensionMap = {
      ps1: 'PowerShell Script',
      txt: 'Ficheiro de Texto',
      json: 'JSON',
      csv: 'CSV',
      xml: 'XML',
      py: 'Python Script',
      sh: 'Shell Script',
      bat: 'Batch Script',
      md: 'Markdown',
      js: 'JavaScript',
      html: 'HTML',
      css: 'CSS'
    }
    if (extensionMap[ext]) return extensionMap[ext]
  }

  // 4. Fallback
  return 'Desconhecido'
}
