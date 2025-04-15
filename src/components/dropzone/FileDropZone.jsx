import React, { useState } from 'react'

/**
 * Componente que permite ao utilizador arrastar ou selecionar ficheiros.
 * Gera buffers a partir dos ficheiros e envia para o callback `onFilesLoaded`.
 *
 * @param {{ onFilesLoaded: function(Array<{file: File, buffer: ArrayBuffer}>): void }} props
 */
function FileDropZone({ onFilesLoaded }) {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)

  /**
   * Processa os ficheiros recebidos e envia os buffers.
   * @param {FileList} files
   */
  const handleFiles = async (files) => {
    const fileList = Array.from(files)
    if (fileList.length === 0) return

    setStatus('A carregar ficheiros...')
    setError(null)

    try {
      const fileDataList = await Promise.all(
        fileList.map(async (file) => {
          if (file.size > 50 * 1024 * 1024) {
            throw new Error(`O ficheiro "${file.name}" excede 50MB.`)
          }
          const buffer = await file.arrayBuffer()
          return { file, buffer }
        })
      )
      onFilesLoaded(fileDataList)
      setStatus(`${fileList.length} ficheiro(s) carregado(s) com sucesso!`)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Erro ao carregar os ficheiros.')
      setStatus(null)
    }
  }

  /**
   * Handler de drop de ficheiros.
   * @param {DragEvent} e
   */
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  /**
   * Handler de seleção via input.
   * @param {Event} e
   */
  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div
      className="file-drop-zone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>Arrasta ficheiros aqui ou</p>
      <label className="file-input-label">
        <input type="file" onChange={handleFileInput} multiple />
        <span>Escolhe ficheiros</span>
      </label>
      {status && <p className="status-message" style={{ color: 'green' }}>{status}</p>}
      {error && <p className="status-message" style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default FileDropZone
