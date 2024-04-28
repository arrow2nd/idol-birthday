import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  optimizeDeps: {
    exclude: ["@resvg/resvg-js"]
  },
  plugins: [remix(), tsconfigPaths()]
})
