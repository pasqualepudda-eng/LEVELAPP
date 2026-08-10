import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Porta unica per tutto: dev, preview e Live Server (vedi .vscode/settings.json).
// `strictPort` evita che Vite scivoli in silenzio su un'altra porta quando la
// 5500 è già occupata: meglio un errore chiaro che un indirizzo diverso.
const PORT = 5500

// https://vite.dev/config/
export default defineConfig({
  // Percorsi asset relativi: la build funziona anche se pubblicata in una
  // sottocartella (es. dominio.it/sito/) e non solo nella root.
  // NB: dist/index.html va comunque SERVITO via HTTP (`npm run preview`).
  // Aprirlo con doppio clic non funziona: i browser bloccano i moduli ES
  // caricati da file:// per via del CORS.
  base: './',
  plugins: [react(), tailwindcss()],
  server: { port: PORT, strictPort: true },
  preview: { port: PORT, strictPort: true },
})
