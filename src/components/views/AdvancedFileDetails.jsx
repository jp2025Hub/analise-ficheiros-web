import React from 'react'
import InfoCard from '../layout/InfoCard'
import {
  getPdfVersion,
  getPngDimensions,
  getMp3Info
} from '../../utils/analysis/fileTypeDetails'

/**
 * Componente que apresenta informações específicas com base no tipo do ficheiro (PDF, PNG, MP3).
 *
 * @param {{ file: File, buffer: ArrayBuffer }} props
 * @returns {JSX.Element|null}
 */
function AdvancedFileDetails({ file, buffer }) {
  if (!file || !buffer) return null

  const tipo = file.type || ''
  const extensao = file.name.split('.').pop().toLowerCase()

  const isPdf = tipo.includes('pdf') || extensao === 'pdf'
  const isPng = tipo.includes('png') || extensao === 'png'
  const isMp3 = tipo.includes('mp3') || extensao === 'mp3'

  const mp3Info = isMp3 ? getMp3Info(buffer) : null

  return (
    <div className="advanced-details">
      <h3>Detalhes Avançados</h3>

      {isPdf && (
        <InfoCard title="Versão do PDF" value={getPdfVersion(buffer)} />
      )}

      {isPng && (
        <InfoCard title="Dimensões PNG" value={getPngDimensions(buffer)} />
      )}

      {isMp3 && mp3Info && (
        <>
          <InfoCard title="Título (MP3)" value={mp3Info.title} />
          <InfoCard title="Artista" value={mp3Info.artist} />
        </>
      )}

      {!isPdf && !isPng && !isMp3 && (
        <InfoCard title="Detalhes específicos" value="Tipo não suportado nesta secção." />
      )}
    </div>
  )
}

export default AdvancedFileDetails
