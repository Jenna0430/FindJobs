import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@findjobs/shared-ui": path.resolve(__dirname, "../shared-ui"),
    }},
  server: {
    host: true,
  },
  build: {
    sourcemap: mode === "development",
  },
  base: "./",
}));
