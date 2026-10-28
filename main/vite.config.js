import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

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
