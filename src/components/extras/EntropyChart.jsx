import React from 'react'
import { calculateBlockEntropy } from '../../utils/analysis/entropyUtils'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Registo obrigatório dos elementos do gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/**
 * Componente que gera um gráfico de barras com os níveis de entropia por bloco do ficheiro.
 *
 * @param {{ buffer: ArrayBuffer, blockSize?: number, show?: boolean }} props
 * @returns {JSX.Element|null}
 */
function EntropyChart({ buffer, blockSize = 256, show = true }) {
  if (!buffer || !show) return null

  const entropies = calculateBlockEntropy(buffer, blockSize)
  if (!entropies || entropies.length === 0) return null

  const data = {
    labels: entropies.map((_, i) => `Bloco ${i + 1}`),
    datasets: [
      {
        label: 'Entropia (bits/byte)',
        data: entropies,
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 8,
        title: {
          display: true,
          text: 'Bits por Byte'
        }
      }
    }
  }

  return (
    <div className="entropy-chart">
      <h3>Gráfico de Entropia</h3>
      <Bar data={data} options={options} />
    </div>
  )
}

export default EntropyChart
