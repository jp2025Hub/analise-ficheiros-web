import React, { useState } from 'react'
import './App.css'
import './index.css'
import './styles/layout.css'
import './styles/theme.css'

import FileDropZone from './components/dropzone/FileDropZone'
import MetadataDisplay from './components/views/MetadataDisplay'
import HashViewer from './components/views/HashViewer'
import FileContentViewer from './components/views/FileContentViewer'
import AdvancedFileDetails from './components/views/AdvancedFileDetails'
import ExportButton from './components/views/ExportButton'
import EntropyChart from './components/extras/EntropyChart'
import FileComparator from './components/extras/FileComparator'

/**
 * Componente principal da aplicação.
 * Gere a navegação entre modos de análise e comparação de ficheiros,
 * e apresenta todos os resultados da análise.
 *
 * @returns {JSX.Element} Interface principal da aplicação.
 */
function App() {
  const [files, setFiles] = useState([])
  const [viewMode, setViewMode] = useState('analisar')
  const [expandedAll, setExpandedAll] = useState(true)

  const handleFilesLoaded = (fileDataList) => {
    setFiles(fileDataList)
  }

  const handleClearFiles = () => {
    setFiles([])
  }

  const toggleAll = () => {
    setExpandedAll((prev) => !prev)
  }

  return (
    <div className="app-container">
      <header>
        <h1>🔎 Visualizador de Metadados de Ficheiros</h1>
        <p>Analisa ficheiros localmente no browser — seguro, rápido e detalhado.</p>
      </header>

      <nav className="view-mode-toggle">
        <button
          className={viewMode === 'analisar' ? 'active' : ''}
          onClick={() => setViewMode('analisar')}
        >
          Analisar Ficheiros
        </button>
        <button
          className={viewMode === 'comparar' ? 'active' : ''}
          onClick={() => setViewMode('comparar')}
        >
          📂 Comparar Ficheiros
        </button>
      </nav>

      <main>
        {viewMode === 'analisar' && (
          <>
            <FileDropZone onFilesLoaded={handleFilesLoaded} />

            {files.length > 0 && (
              <div className="results">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button className="clear-button" onClick={handleClearFiles}>
                    Limpar Ficheiros
                  </button>
                  <button onClick={toggleAll}>
                    {expandedAll ? 'Recolher Todos' : 'Expandir Todos'}
                  </button>
                </div>

                {files.map(({ file, buffer }, index) => (
                  <details
                    key={`${file.name}-${index}`}
                    className="file-analysis"
                    open={expandedAll}
                  >
                    <summary><h2>{file.name}</h2></summary>
                    <MetadataDisplay file={file} buffer={buffer} />
                    <EntropyChart buffer={buffer} />
                    <HashViewer buffer={buffer} />
                    <FileContentViewer file={file} buffer={buffer} />
                    <AdvancedFileDetails file={file} buffer={buffer} />
                    <ExportButton file={file} buffer={buffer} />
                  </details>
                ))}
              </div>
            )}
          </>
        )}

        {viewMode === 'comparar' && (
          <div className="comparator-section">
            <FileComparator />
          </div>
        )}
      </main>

      <footer>
        <small>© {new Date().getFullYear()} João Cabral • Projeto educativo</small>
      </footer>
    </div>
  )
}

export default App
