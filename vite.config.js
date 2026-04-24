// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY

  return {
    plugins: [
      react(),
      {
        name: 'dev-netlify-functions',
        configureServer(server) {
          server.middlewares.use('/.netlify/functions/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', (c) => (body += c))
            req.on('end', async () => {
              try {
                const mod = await import('./netlify/functions/chat.js')
                const result = await mod.handler({ httpMethod: 'POST', body })
                res.statusCode = result.statusCode
                if (result.headers) {
                  for (const [k, v] of Object.entries(result.headers)) res.setHeader(k, v)
                }
                res.end(result.body)
              } catch (err) {
                res.statusCode = 500
                res.end(JSON.stringify({ error: String(err) }))
              }
            })
          })
        },
      },
    ],
  }
})
