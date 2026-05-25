import { defineConfig } from 'vite'

export default defineConfig({
  // For GitHub Pages, Vite should not hardcode absolute paths.
  // We'll use relative assets by default; Pages works with this.
  // If you deploy to a subpath (e.g. /repo-name), set base accordingly.
  base: './',
})

