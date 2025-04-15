// src/utils/data/fileSignatures.js

export const fileSignatures = [
    // Documentos
    { hex: '25504446', type: 'PDF', mime: 'application/pdf' },
    { hex: 'D0CF11E0A1B11AE1', type: 'DOC/XLS (antigos)', mime: 'application/vnd.ms-office' },
    { hex: '504B0304', type: 'DOCX/XLSX/PPTX/ZIP', mime: 'application/zip' },
    { hex: '7B5C727466', type: 'RTF', mime: 'application/rtf' },
  
    // Imagens
    { hex: 'FFD8FF', type: 'JPEG', mime: 'image/jpeg' },
    { hex: '89504E47', type: 'PNG', mime: 'image/png' },
    { hex: '47494638', type: 'GIF', mime: 'image/gif' },
    { hex: '49492A00', type: 'TIFF (little endian)', mime: 'image/tiff' },
    { hex: '4D4D002A', type: 'TIFF (big endian)', mime: 'image/tiff' },
  
    // Áudio e vídeo
    { hex: '494433', type: 'MP3 (ID3v2)', mime: 'audio/mpeg' },
    { hex: '000001BA', type: 'MPEG video', mime: 'video/mpeg' },
    { hex: '000001B3', type: 'MPEG video', mime: 'video/mpeg' },
    { hex: '1A45DFA3', type: 'MKV/WebM', mime: 'video/webm' },
  
    // Arquivos
    { hex: '504B0304', type: 'ZIP', mime: 'application/zip' },
    { hex: '52617221', type: 'RAR', mime: 'application/vnd.rar' },
    { hex: '377ABCAF271C', type: '7-Zip', mime: 'application/x-7z-compressed' },
    { hex: '1F8B08', type: 'GZIP', mime: 'application/gzip' },
  
    // Executáveis e binários
    { hex: '4D5A', type: 'EXE/DLL', mime: 'application/vnd.microsoft.portable-executable' },
    { hex: '7F454C46', type: 'ELF', mime: 'application/x-executable' },
  
    // Web e dados
    { hex: '3C3F786D6C', type: 'XML', mime: 'application/xml' },
    { hex: '68746D6C3E', type: 'HTML (incompleto)', mime: 'text/html' },
    { hex: '7B0A', type: 'JSON (estimado)', mime: 'application/json' }, // só heurístico
  
    // Outros
    { hex: '0001000000000000', type: 'ICO', mime: 'image/vnd.microsoft.icon' },
    { hex: 'CAFEBABE', type: 'Java Class', mime: 'application/java-vm' },
  ]
  