import React from 'react'
import InfoCard from '../layout/InfoCard'
import { formatBytes, formatDate } from '../../utils/formatting/formatUtils'
import { getMagicNumber, detectFileTypeByMagic } from '../../utils/analysis/magicUtils'
import { calculateEntropy } from '../../utils/analysis/entropyUtils'
import { fileTypeDatabase } from '../../components/data/fileTypeDatabase'
import { fileSignatures } from '../../components/data/fileSignatures'
import { lookup as lookupMime } from 'mime-types'

/**
 * Devolve um tipo MIME com base na extensão do nome do ficheiro.
 * @param {string} filename
 * @returns {string|null}
 */
function inferMimeFromExtension(filename) {
  const result = lookupMime(filename)
  return result || null
}

/**
 * Componente que apresenta os metadados principais de um ficheiro.
 *
 * @param {{ file: File, buffer: ArrayBuffer }} props
 * @returns {JSX.Element|null}
 */
function MetadataDisplay({ file, buffer }) {
  if (!file || !buffer) return null

  const magic = getMagicNumber(buffer, 12)
  const tipoReal = detectFileTypeByMagic(magic, buffer, file)

  // Tenta obter MIME real a partir da assinatura
  const assinatura = fileSignatures.find(sig => magic.startsWith(sig.hex))
  const mimeReal = assinatura?.mime || '—'

  const entropia = calculateEntropy(buffer)

  const inferredMime = inferMimeFromExtension(file.name)
  const mime = file.type || inferredMime || 'Desconhecido'

  const ext = file.name.split('.').pop().toLowerCase()
  const tipoExtra = fileTypeDatabase[ext]

  const mismatch =
    tipoReal !== 'Desconhecido' &&
    mime !== 'Desconhecido' &&
    mimeReal !== '—' &&
    mime.toLowerCase() !== mimeReal.toLowerCase()

  return (
    <div className="metadata-display">
      <h3>Metadados</h3>
      <InfoCard title="Nome" value={file.name} />
      <InfoCard title="Tipo MIME" value={mime} />
      <InfoCard title="MIME Real (Assinatura)" value={mimeReal} />
      <InfoCard title="Tipo Real (Assinatura)" value={`${tipoReal} (${magic || '—'})`} />
      {mismatch && (
        <InfoCard
          title="⚠️ Aviso"
          value="Tipo MIME não coincide com a assinatura mágica — possível disfarce de extensão."
        />
      )}
      <InfoCard title="Tamanho" value={formatBytes(file.size)} />
      <InfoCard title="Última Modificação" value={formatDate(file.lastModified)} />
      <InfoCard title="Entropia" value={`${entropia} bits/byte`} />

      {tipoExtra && (
        <>
          <InfoCard title="Descrição" value={tipoExtra.descricao} />
          <InfoCard title="Categoria" value={tipoExtra.categoria} />
          <InfoCard title="Programas Recomendados" value={tipoExtra.programas.join(', ')} />
        </>
      )}
    </div>
  )
}

export default MetadataDisplay
