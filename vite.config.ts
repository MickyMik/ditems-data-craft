import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
//import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Ajouté pour GitHub Pages
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
 // plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   optimizeDeps: {
    include: ["emailjs-com"], // ✅ Ajouté pour forcer Vite à inclure emailjs-com
  },
  build: {
    rollupOptions: {
      // Evite les erreurs si emailjs-com fait référence à des libs Node
      external: [],
    },
  },
}));
