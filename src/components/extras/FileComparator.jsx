import React, { useState } from 'react'
import ExportButton from '../views/ExportButton'

/**
 * Componente que permite comparar dois ficheiros binariamente e exportar os seus metadados.
 *
 * @returns {JSX.Element}
 */
function FileComparator() {
  const [filesData, setFilesData] = useState([])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(null)

  /**
   * Compara dois ficheiros byte a byte e atualiza o estado.
   * @param {FileList} inputFiles
   */
  const handleCompare = async (inputFiles) => {
    setError(null)
    setResult(null)
    setStatus('A comparar...')

    const fileList = Array.from(inputFiles)
    if (fileList.length !== 2) {
      setError('Deves selecionar exatamente dois ficheiros para comparar.')
      setFilesData([])
      setStatus(null)
      return
    }

    try {
      const [fileA, fileB] = fileList
      const [bufferA, bufferB] = await Promise.all([
        fileA.arrayBuffer(),
        fileB.arrayBuffer()
      ])

      const viewA = new Uint8Array(bufferA)
      const viewB = new Uint8Array(bufferB)

      const sameSize = viewA.length === viewB.length
      const sameContent = sameSize && viewA.every((byte, i) => byte === viewB[i])

      // Base para futura comparação avançada (diferencas byte a byte)
      // const diferencas = []
      // for (let i = 0; i < Math.min(viewA.length, viewB.length); i++) {
      //   if (viewA[i] !== viewB[i]) {
      //     diferencas.push({ offset: i, byteA: viewA[i], byteB: viewB[i] })
      //   }
      // }

      setFilesData([
        { file: fileA, buffer: bufferA },
        { file: fileB, buffer: bufferB }
      ])
      setResult(sameContent ? '✅ Os ficheiros são exatamente iguais.' : '❌ Os ficheiros são diferentes.')
      setStatus(null)
    } catch (err) {
      console.error(err)
      setError('Ocorreu um erro ao comparar os ficheiros.')
      setStatus(null)
    }
  }

  return (
    <div className="file-comparator card">
      <h3>Comparador de Ficheiros</h3>

      <label className="file-input-label">
        <input
          type="file"
          multiple
          onChange={(e) => handleCompare(e.target.files)}
        />
        <span>Escolher dois ficheiros</span>
      </label>

      {status && <p className="status-message" style={{ color: '#555' }}>{status}</p>}
      {error && <p className="status-message" style={{ color: 'red' }}>{error}</p>}

      {filesData.length === 2 && (
        <div className="comparison-result" style={{ marginTop: '1rem' }}>
          <ul>
            <li><strong>{filesData[0].file.name}</strong> — {filesData[0].file.size} bytes</li>
            <li><strong>{filesData[1].file.name}</strong> — {filesData[1].file.size} bytes</li>
          </ul>
          <p><strong>Resultado:</strong> {result}</p>

          <ExportButton multipleFiles={filesData} />
        </div>
      )}
    </div>
  )
}

export default FileComparator
