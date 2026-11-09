import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000, // O el puerto estándar que use tu app
    hmr: {
      clientPort: 443, // Fuerza el uso de HTTPS estándar para evitar bloqueos de WebSocket en el proxy
    },
  },
});