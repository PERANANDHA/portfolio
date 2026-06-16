import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-parent-certificates',
      configureServer(server) {
        server.middlewares.use('/Certificates', (req, res, next) => {
          const filePath = path.resolve(__dirname, '..', 'Certificates', req.url.slice(1));
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/pdf');
            fs.createReadStream(filePath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ],
  server: {
    port: 5176,
    open: true,
  }
})
