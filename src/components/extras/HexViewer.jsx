import React, { useState } from 'react'
import InfoCard from '../layout/InfoCard'

/**
 * Componente que mostra uma visualização hexadecimal (hex dump) do conteúdo do ficheiro.
 *
 * @param {{ buffer: ArrayBuffer }} props
 * @returns {JSX.Element|null}
 */
function HexViewer({ buffer }) {
  const [expanded, setExpanded] = useState(false)
  if (!buffer) return null

  const bytes = new Uint8Array(buffer)
  const lines = []
  const maxBytes = expanded ? bytes.length : 512

  for (let i = 0; i < maxBytes; i += 16) {
    const slice = bytes.slice(i, i + 16)
    const hex = Array.from(slice).map(b => b.toString(16).padStart(2, '0')).join(' ')
    const ascii = Array.from(slice).map(b => (b >= 32 && b < 127 ? String.fromCharCode(b) : '.')).join('')
    lines.push(`${i.toString(16).padStart(8, '0')}: ${hex.padEnd(47)}  ${ascii}`)
  }

  return (
    <div className="hex-viewer">
      <h3>Hex Dump</h3>
      <InfoCard title="Conteúdo Hexadecimal" value={lines.join('\n')} />
      {bytes.length > 512 && (
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Mostrar Menos' : 'Mostrar Mais'}
        </button>
      )}
    </div>
  )
}

export default HexViewer
