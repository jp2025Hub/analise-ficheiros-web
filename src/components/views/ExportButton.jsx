import React, { useState } from 'react'
import { formatBytes, formatDate } from '../../utils/formatting/formatUtils'
import { getMagicNumber, detectFileTypeByMagic } from '../../utils/analysis/magicUtils'
import { calculateEntropy } from '../../utils/analysis/entropyUtils'
import { exportAsBlob } from '../../utils/export/exportUtils'
import { fileTypeDatabase } from '../../components/data/fileTypeDatabase'
import { fileSignatures } from '../../components/data/fileSignatures'

/**
 * Componente que permite exportar os metadados de ficheiros em formatos JSON, TXT e CSV.
 *
 * @param {{
 *  file?: File,
 *  buffer?: ArrayBuffer,
 *  multipleFiles?: Array<{ file: File, buffer: ArrayBuffer }>
 * }} props
 * @returns {JSX.Element}
 */
function ExportButton({ file, buffer, multipleFiles = null }) {
  const [status, setStatus] = useState('')

  const exportSingleJSON = () => {
    try {
      const content = JSON.stringify(collectMetadata(file, buffer), null, 2)
      exportAsBlob(content, `${file.name}.json`, 'application/json')
      setStatus('Exportação JSON concluída!')
    } catch {
      setStatus('❌ Erro na exportação JSON.')
    }
  }

  const exportSingleTXT = () => {
    try {
      const data = collectMetadata(file, buffer)
      const content = `
Nome: ${data.nome}
Tipo MIME: ${data.tipoMime}
MIME Real: ${data.mimeReal}
Tipo Real: ${data.tipoReal}
Tamanho: ${data.tamanho}
Última Modificação: ${data.ultimaModificacao}
Entropia: ${data.entropia}
Categoria: ${data.categoria}
Descrição: ${data.descricao}
Programas Recomendados: ${data.programas}
      `.trim()

      exportAsBlob(content, `${file.name}.txt`, 'text/plain')
      setStatus('Exportação TXT concluída!')
    } catch {
      setStatus('❌ Erro na exportação TXT.')
    }
  }

  const exportSingleCSV = () => {
    try {
      const d = collectMetadata(file, buffer)
      const csv = `Nome,Tipo MIME,MIME Real,Tipo Real,Tamanho,Última Modificação,Entropia,Categoria,Descrição,Programas Recomendados\n"${d.nome}","${d.tipoMime}","${d.mimeReal}","${d.tipoReal}","${d.tamanho}","${d.ultimaModificacao}","${d.entropia}","${d.categoria}","${d.descricao}","${d.programas}"`
      exportAsBlob(csv, `${file.name}.csv`, 'text/csv')
      setStatus('Exportação CSV concluída!')
    } catch {
      setStatus('❌ Erro na exportação CSV.')
    }
  }

  const exportAllJSON = () => {
    try {
      const full = multipleFiles.map(({ file, buffer }) => collectMetadata(file, buffer))
      const content = JSON.stringify(full, null, 2)
      exportAsBlob(content, `analise_completa.json`, 'application/json')
      setStatus('Todos os metadados exportados em JSON!')
    } catch {
      setStatus('❌ Erro na exportação de múltiplos ficheiros.')
    }
  }

  /**
   * Extrai os metadados relevantes de um ficheiro e buffer.
   * @param {File} f
   * @param {ArrayBuffer} b
   * @returns {object}
   */
  const collectMetadata = (f, b) => {
    const magic = getMagicNumber(b)
    const tipoReal = detectFileTypeByMagic(magic, b, f)
    const entropia = calculateEntropy(b)
    const ext = f.name.split('.').pop().toLowerCase()
    const tipoExtra = fileTypeDatabase[ext]
    const sig = fileSignatures.find(s => magic.startsWith(s.hex))
    const mimeReal = sig?.mime || '—'

    return {
      nome: f.name,
      tipoMime: f.type || 'Desconhecido',
      mimeReal,
      tipoReal: `${tipoReal} (${magic})`,
      tamanho: formatBytes(f.size),
      ultimaModificacao: new Date(f.lastModified).toISOString(),
      entropia: `${entropia} bits/byte`,
      categoria: tipoExtra?.categoria || '—',
      descricao: tipoExtra?.descricao || '—',
      programas: tipoExtra?.programas?.join(', ') || '—'
    }
  }

  return (
    <div className="export-buttons">
      <h3>Exportar Metadados</h3>
      {file && buffer && (
        <>
          <button onClick={exportSingleJSON}>JSON</button>
          <button onClick={exportSingleTXT}>TXT</button>
          <button onClick={exportSingleCSV}>CSV</button>
        </>
      )}
      {multipleFiles && (
        <button onClick={exportAllJSON}>Exportar Todos (JSON)</button>
      )}
      {status && <p className="status-message">{status}</p>}
    </div>
  )
}

export default ExportButton
