import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` (development, test, production)
  // The third arg '' tells loadEnv to load all variables, not only those starting with VITE_
  const env = loadEnv(mode, process.cwd(), '')

  // Create a simple map for define replacement (values must be stringified)
  const defineEnv = Object.keys(env).reduce<Record<string, string>>((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key])
    acc[`import.meta.env.${key}`] = JSON.stringify(env[key])
    return acc
  }, {})

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    // base can be overridden via VITE_BASE
    base: env.VITE_BASE || '/',
    define: {
      // expose env vars for libraries or code that expect process.env or import.meta.env
      ...defineEnv,
      // keep NODE_ENV in-sync with mode
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    server: {
      port: Number(env.VITE_DEV_PORT) || 3000,
      open: env.VITE_DEV_OPEN === 'true' || false,
      // recommended for local development when backend runs on another origin
      cors: true,
    },
    preview: {
      port: Number(env.VITE_PREVIEW_PORT) || 4173,
    },
    build: {
      outDir: env.VITE_BUILD_OUT_DIR || 'dist',
      sourcemap: mode !== 'production',
      minify: mode === 'production' ? 'esbuild' : false,
    },
  }
})
