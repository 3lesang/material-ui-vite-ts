import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ routesDirectory: "src/pages" }), react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
