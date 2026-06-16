import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/communitiful-vincense/",
  plugins: [react()],
  server: {
    host: true, // Allows external access
    port: 5173, // You can change this if needed
    proxy: {
      '/api/vitals': {
        target: 'https://docs.google.com',
        changeOrigin: true,
        secure: false, // Sometimes helpful for https targets
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Proxy error occurred:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Proxy received response:', proxyRes.statusCode, req.url);
          });
        },
        rewrite: (path) => {
          const query = path.split('?')[1] || '';
          console.log('Proxy Rewriting Path:', path, 'Query:', query);
          return `/spreadsheets/d/1moJ6MTDPs5JY3Uyut-rkCIRqDYJzjqMHxsZJKh28kvk/export?format=xlsx${query ? '&' + query : ''}`;
        }
      }
    }
  }
})
