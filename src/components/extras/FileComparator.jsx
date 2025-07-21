import React, { useState } from 'react'
import ExportButton from '../views/ExportButton'
import { exportAsBlob } from '../../utils/export/exportUtils'

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
  const [diffs, setDiffs] = useState([])

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
      setDiffs([])
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

      // Base para comparação detalhada byte a byte
      const diferencas = []
      const maxLen = Math.max(viewA.length, viewB.length)
      for (let i = 0; i < maxLen; i++) {
        const byteA = viewA[i]
        const byteB = viewB[i]
        if (byteA !== byteB) {
          diferencas.push({
            offset: i,
            byteA: byteA === undefined ? null : byteA,
            byteB: byteB === undefined ? null : byteB
          })
        }
      }

      setFilesData([
        { file: fileA, buffer: bufferA },
        { file: fileB, buffer: bufferB }
      ])
      setDiffs(diferencas)
      setResult(sameContent ? '✅ Os ficheiros são exatamente iguais.' : '❌ Os ficheiros são diferentes.')
      setStatus(null)
    } catch (err) {
      console.error(err)
      setError('Ocorreu um erro ao comparar os ficheiros.')
      setDiffs([])
      setStatus(null)
    }
  }

  const copyDiffs = async () => {
    try {
      const text = diffs.map((d) => `offset ${d.offset}: ${d.byteA ?? '—'} != ${d.byteB ?? '—'}`).join('\n')
      await navigator.clipboard.writeText(text)
      setStatus('Diferenças copiadas!')
    } catch {
      setStatus('❌ Erro ao copiar diferenças.')
    }
  }

  const exportDiffs = () => {
    try {
      const content = JSON.stringify(diffs, null, 2)
      exportAsBlob(content, 'diferencas.json', 'application/json')
      setStatus('Diferenças exportadas!')
    } catch {
      setStatus('❌ Erro ao exportar diferenças.')
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

          {diffs.length > 0 && (
            <div className="diff-summary" style={{ marginTop: '1rem' }}>
              <p><strong>Primeiras diferenças:</strong></p>
              <ul>
                {diffs.slice(0, 10).map((d) => (
                  <li key={d.offset}>
                    Offset {d.offset}: {d.byteA ?? '—'} ≠ {d.byteB ?? '—'}
                  </li>
                ))}
                {diffs.length > 10 && <li>…</li>}
              </ul>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={copyDiffs}>Copiar Diferenças</button>
                <button onClick={exportDiffs} style={{ marginLeft: '0.5rem' }}>
                  Exportar JSON
                </button>
              </div>
            </div>
          )}

          <ExportButton multipleFiles={filesData} />
        </div>
      )}
    </div>
  )
}

export default FileComparator
