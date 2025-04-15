/**
 * Exporta um conteúdo como ficheiro para download.
 *
 * @param {string} content - O conteúdo a exportar.
 * @param {string} filename - O nome do ficheiro de saída (ex: "dados.json").
 * @param {string} [type="text/plain"] - O tipo MIME do conteúdo exportado.
 */
export function exportAsBlob(content, filename, type = 'text/plain') {
  try {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erro ao exportar ficheiro:', error)
    alert('Ocorreu um erro ao tentar exportar o ficheiro.')
  }
}
