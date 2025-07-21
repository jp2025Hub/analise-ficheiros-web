import React, { useEffect, useState } from 'react'
import InfoCard from '../layout/InfoCard'

/**
 * Componente que mostra a pré-visualização do conteúdo de um ficheiro:
 * texto se possível, ou os primeiros bytes em hexadecimal.
 *
 * @param {{ file: File, buffer: ArrayBuffer }} props
 * @returns {JSX.Element|null}
 */
function FileContentViewer({ file, buffer }) {
  const [preview, setPreview] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [mediaUrl, setMediaUrl] = useState(null)
  const [mediaType, setMediaType] = useState(null)

  useEffect(() => {
    if (!buffer || !file) return

    let url = null

    const isImage = file.type.startsWith('image/')
    const isAudio = file.type.startsWith('audio/')
    const isTextFile =
      file.type.startsWith('text/') || file.name.endsWith('.json') || file.name.endsWith('.txt')

    if (isImage) {
      url = URL.createObjectURL(file)
      setMediaUrl(url)
      setMediaType('image')
      setPreview('')
    } else if (isAudio) {
      const blob = new Blob([buffer], { type: file.type || 'audio/*' })
      url = URL.createObjectURL(blob)
      setMediaUrl(url)
      setMediaType('audio')
      setPreview('')
    } else if (isTextFile) {
      const text = new TextDecoder().decode(buffer)
      const displayText = expanded ? text : text.slice(0, 1024)
      setPreview(displayText.trim())
      setMediaUrl(null)
      setMediaType(null)
    } else {
      const view = new Uint8Array(buffer).slice(0, 64)
      const hex = Array.from(view)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join(' ')
      setPreview(hex)
      setMediaUrl(null)
      setMediaType(null)
    }

    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [file, buffer, expanded])

  if (!buffer) return null

  return (
    <div className="file-content-viewer">
      <h3>Conteúdo (pré-visualização)</h3>
      {mediaType === 'image' && mediaUrl && (
        <img
          src={mediaUrl}
          alt={file.name}
          style={{ maxWidth: '200px', maxHeight: '200px' }}
        />
      )}
      {mediaType === 'audio' && mediaUrl && <audio controls src={mediaUrl} />}
      {!mediaType && (
        <>
          <InfoCard title="Preview" value={preview || 'Não disponível'} />
          {file.type.startsWith('text/') && (
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Mostrar Menos' : 'Mostrar Mais'}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default FileContentViewer
