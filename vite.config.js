import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function supabaseEnvPlugin() {
  return {
    name: 'supabase-env-middleware',
    configureServer(server) {
      server.middlewares.use('/api/supabase-env', (req, res) => {
        const envPath = path.resolve(process.cwd(), '.env')

        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const { url, anonKey } = JSON.parse(body || '{}')
              let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''
              const urlMatch = envContent.match(/^VITE_SUPABASE_URL=(.*)$/m)
              const keyMatch = envContent.match(/^VITE_SUPABASE_ANON_KEY=(.*)$/m)
              const currentUrl = urlMatch ? urlMatch[1].trim() : ''
              const currentKey = keyMatch ? keyMatch[1].trim() : ''

              // Jika kredensial sudah persis sama, jangan tulis ulang file agar Vite tidak memicu full page reload!
              if ((url || '').trim() === currentUrl && (anonKey || '').trim() === currentKey) {
                res.setHeader('Content-Type', 'application/json')
                return res.end(JSON.stringify({ success: true, unchanged: true }))
              }

              if (/^VITE_SUPABASE_URL=.*/m.test(envContent)) {
                envContent = envContent.replace(/^VITE_SUPABASE_URL=.*/m, `VITE_SUPABASE_URL=${url || ''}`)
              } else {
                envContent += `\nVITE_SUPABASE_URL=${url || ''}`
              }

              if (/^VITE_SUPABASE_ANON_KEY=.*/m.test(envContent)) {
                envContent = envContent.replace(/^VITE_SUPABASE_ANON_KEY=.*/m, `VITE_SUPABASE_ANON_KEY=${anonKey || ''}`)
              } else {
                envContent += `\nVITE_SUPABASE_ANON_KEY=${anonKey || ''}`
              }

              fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8')
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, url, anonKey }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          // GET
          try {
            const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''
            const urlMatch = envContent.match(/^VITE_SUPABASE_URL=(.*)$/m)
            const keyMatch = envContent.match(/^VITE_SUPABASE_ANON_KEY=(.*)$/m)
            const url = urlMatch ? urlMatch[1].trim() : ''
            const anonKey = keyMatch ? keyMatch[1].trim() : ''
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url, anonKey }))
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ url: '', anonKey: '' }))
          }
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), supabaseEnvPlugin()],
  server: {
    host: true,
    port: 5173,
  },
})
