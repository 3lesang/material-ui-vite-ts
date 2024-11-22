import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";

import { resolve } from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
