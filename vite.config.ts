/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base:"checksheat",
  plugins: [svelte()],
  build: {
    outDir: "docs"
  },
  test: {
    // testの対象ファイル
    include: ['src/**/*.{test,spec}.{js,ts}'],
    globals: true,
    // testの環境
    environment: 'jsdom'
  }
})
