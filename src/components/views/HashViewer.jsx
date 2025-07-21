import React, { useEffect, useState } from 'react'
import { generateHash } from '../../utils/analysis/hashUtils'
import InfoCard from '../layout/InfoCard'

/**
 * Componente que calcula e apresenta os hashes (SHA-1, SHA-256, SHA-512) de um ficheiro.
 *
 * @param {{ buffer: ArrayBuffer }} props
 * @returns {JSX.Element}
 */
function HashViewer({ buffer }) {
  const [hashes, setHashes] = useState({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    const gerar = async () => {
      if (!buffer) return
      setLoading(true)
      setStatus('A calcular hashes...')

      try {
        const [sha1, sha256, sha512] = await Promise.all([
          generateHash(buffer, 'SHA-1'),
          generateHash(buffer, 'SHA-256'),
          generateHash(buffer, 'SHA-512')
        ])
        setHashes({ sha1, sha256, sha512 })
        setStatus('Hashes gerados com sucesso!')
      } catch {
        setStatus('❌ Erro ao calcular hashes.')
      }

      setLoading(false)
    }

    gerar()
  }, [buffer])

  const copiar = async (valor) => {
    try {
      await navigator.clipboard.writeText(valor)
      setStatus('Hash copiado para a área de transferência!')
    } catch {
      setStatus('❌ Erro ao copiar hash.')
    }
  }

  const copiarTodos = async () => {
    const texto = `SHA-1: ${hashes.sha1}\nSHA-256: ${hashes.sha256}\nSHA-512: ${hashes.sha512}`
    try {
      await navigator.clipboard.writeText(texto)
      setStatus('Todos os hashes copiados!')
    } catch {
      setStatus('❌ Erro ao copiar todos os hashes.')
    }
  }

  return (
    <div className="hash-viewer">
      <h3>Hashes</h3>
      {loading ? (
        <p>🌀 A calcular hashes...</p>
      ) : (
        <>
          <InfoCard title="SHA-1" value={hashes.sha1}>
            <button onClick={() => copiar(hashes.sha1)}>Copiar</button>
          </InfoCard>
          <InfoCard title="SHA-256" value={hashes.sha256}>
            <button onClick={() => copiar(hashes.sha256)}>Copiar</button>
          </InfoCard>
          <InfoCard title="SHA-512" value={hashes.sha512}>
            <button onClick={() => copiar(hashes.sha512)}>Copiar</button>
          </InfoCard>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={copiarTodos}>Copiar Todos</button>
          </div>
        </>
      )}
      {status && <p className="status-message">{status}</p>}
    </div>
  )
}

export default HashViewer
