import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  logLevel: "warning",
  build: {
    outDir: path.resolve(__dirname, "docs"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
      },
      output: {
        manualChunks: {
          phaser: ["phaser"],
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 8080,
  },
});
