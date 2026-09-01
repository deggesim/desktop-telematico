import { defineConfig } from "electron-vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        // Chiave "main" → output: out/main/main.js (allineato con "main" in package.json)
        input: { main: resolve(__dirname, "src/main/main.ts") },
        // electron non va bundlato: il suo index.js CJS usa __dirname per trovare path.txt.
        // I moduli nativi nemmeno: bindings risolve i .node rispetto a __dirname.
        external: ["electron", /^electron\/.+/, "better-sqlite3"],
      },
    },
    resolve: {
      alias: { "@shared": resolve(__dirname, "src/shared") },
    },
  },
  preload: {
    build: {
      rollupOptions: {
        input: { index: resolve(__dirname, "src/preload/index.ts") },
        external: ["electron", /^electron\/.+/],
        // Il preload con sandbox:true richiede CJS (ESM non supportato nel contesto sandboxed)
        output: { format: "cjs" },
      },
    },
  },
  renderer: {
    root: "src/renderer",
    plugins: [react()],
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "src/shared"),
        "@ds": resolve(__dirname, "src/renderer/vendor/ds-agenzia-entrate"),
      },
    },
  },
});
