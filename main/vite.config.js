import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 70 },
      jpeg: { quality: 70 },
      jpg: { quality: 70 },
      webp: { quality: 80 },
      includePublic: true,
    }),
  ],
  server: {
    proxy: {
      // Proxy badge API requests server-side to avoid CORS.
      // Override target with VITE_SKILLBOOST_API (e.g. your local http://127.0.0.1:8000).
      "/gcp-badges": {
        target:
          process.env.VITE_SKILLBOOST_API ||
          "https://google-cloud-skill-boost-badges-api.vercel.app",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/gcp-badges/, ""),
      },
    },
  },
})
