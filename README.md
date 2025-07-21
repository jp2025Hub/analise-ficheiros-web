# Visualizador de Metadados de Ficheiros

Uma aplicação web desenvolvida com React que permite analisar ficheiros diretamente no navegador, de forma local, segura e privada. Ideal para fins educativos, análise forense leve, demonstrações técnicas e portefólio pessoal.

***** GITHUB PAGES PARA ACEDER À WEBAPP -> https://jp2025hub.github.io/analise-ficheiros-web/

## Funcionalidades

- Análise local de ficheiros (sem envio para servidores)
- Leitura de metadados:
  - Nome do ficheiro
  - Tipo MIME
  - Assinatura mágica (magic number)
  - Tamanho
  - Data da última modificação
  - Entropia (bits/byte)
- Cálculo de hashes: SHA-1, SHA-256 e SHA-512
- Pré-visualização do conteúdo (texto legível ou hexadecimal)
- Visualização completa em hexadecimal (hex dump) com opção de expansão
- Detalhes avançados para tipos como PDF, PNG, MP3
- Gráfico de entropia por blocos
- Tamanho de bloco configurável para o gráfico de entropia
- Comparação binária de dois ficheiros
- Exportação dos dados analisados em formato JSON ou TXT
- Suporte a múltiplos ficheiros
- Interface limpa, responsiva e modular

## Tecnologias

- React 19
- Vite
- Chart.js
- JavaScript moderno (ES Modules)
- CSS modular (App.css, theme.css, layout.css)
- Processamento local com APIs Web (FileReader, ArrayBuffer, TextDecoder)

## Privacidade

Todos os ficheiros são lidos apenas no navegador. Nenhuma informação é enviada para servidores externos.

## Estrutura de Pastas

📁 file-metadata-viewer/
├── index.html
├── package.json
├── vite.config.js
├── 📁 src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── layout.css
│   ├── theme.css
│   ├── 📁 components/
│   │   ├── 📁 dropzone/
│   │   │   └── FileDropZone.jsx
│   │   ├── 📁 extras/
│   │   │   ├── EntropyChart.jsx
│   │   │   └── FileComparator.jsx
│   │   ├── 📁 layout/
│   │   │   └── InfoCard.jsx
│   │   └── 📁 views/
│   │       ├── AdvancedFileDetails.jsx
│   │       ├── ExportButton.jsx
│   │       ├── FileContentViewer.jsx
│   │       ├── HashViewer.jsx
│   │       ├── MetadataDisplay.jsx
│   │       └── HexViewer.jsx
│   ├── 📁 utils/
│   │   ├── 📁 analysis/
│   │   │   ├── entropyUtils.js
│   │   │   ├── fileTypeDetails.js
│   │   │   ├── hashUtils.js
│   │   │   └── magicUtils.js
│   │   ├── 📁 formatting/
│   │   │   └── formatUtils.js
│   │   └── 📁 export/
│   │       └── exportUtils.js
-------------------------------------------------------


## Exemplo de Utilização

```jsx
<EntropyChart buffer={arrayBuffer} blockSize={512} />
```

Define o tamanho de cada bloco lido ao calcular a entropia.

## Licença

Este projeto é de uso livre para fins educativos e demonstrativos. Podes utilizá-lo, estudar e modificá-lo como quiseres. Atribuição é apreciada mas não obrigatória.

## Autor

Desenvolvido por João Cabral
