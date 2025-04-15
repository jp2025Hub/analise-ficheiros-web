import React from 'react'

/**
 * Componente genérico para apresentar uma informação em cartão com título e valor.
 *
 * @param {{ title: string, value: string, children?: React.ReactNode }} props
 * @returns {JSX.Element}
 */
function InfoCard({ title, value, children }) {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <h4>{title}</h4>
        {children && <div className="info-card-tools">{children}</div>}
      </div>
      <pre>{value || '—'}</pre>
    </div>
  )
}

export default InfoCard
