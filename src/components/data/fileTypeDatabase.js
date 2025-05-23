// src/utils/data/fileTypeDatabase.js

export const fileTypeDatabase = {
    pdf: {
      nome: "PDF",
      categoria: "Documentos",
      descricao: "Formato portátil de documentos criado pela Adobe. Preserva a formatação original.",
      programas: ["Adobe Acrobat Reader", "Okular", "Foxit Reader"]
    },
    png: {
      nome: "PNG",
      categoria: "Imagens",
      descricao: "Formato de imagem raster com compressão sem perdas. Suporta transparência.",
      programas: ["GIMP", "Adobe Photoshop", "Visualizador de Imagens"]
    },
    jpg: {
      nome: "JPEG",
      categoria: "Imagens",
      descricao: "Formato de imagem com compressão com perdas, ideal para fotografias.",
      programas: ["GIMP", "Photoshop", "Paint"]
    },
    mp3: {
      nome: "MP3",
      categoria: "Áudio",
      descricao: "Formato popular de áudio com compressão com perdas.",
      programas: ["VLC", "Audacity", "Windows Media Player"]
    },
    txt: {
      nome: "Texto Simples",
      categoria: "Documentos",
      descricao: "Ficheiro de texto plano, sem formatação.",
      programas: ["Notepad", "VS Code", "Gedit"]
    },
    json: {
      nome: "JSON",
      categoria: "Dados",
      descricao: "Formato leve para troca de dados estruturados em texto.",
      programas: ["VS Code", "Notepad++", "Sublime Text"]
    },
    csv: {
      nome: "CSV",
      categoria: "Dados",
      descricao: "Ficheiro de texto com valores separados por vírgulas. Usado em folhas de cálculo.",
      programas: ["Excel", "LibreOffice Calc", "Google Sheets"]
    },
    zip: {
      nome: "ZIP",
      categoria: "Arquivos",
      descricao: "Formato de compressão e arquivamento de múltiplos ficheiros.",
      programas: ["7-Zip", "WinRAR", "PeaZip"]
    },
    html: {
      nome: "HTML",
      categoria: "Web",
      descricao: "Linguagem de marcação usada para criar páginas web.",
      programas: ["VS Code", "Sublime Text", "Browsers"]
    }
  }
  