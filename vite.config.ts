import react from "@vitejs/plugin-react"

import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"
const __dirname = dirname(fileURLToPath(import.meta.url))

import { globSync } from "glob"
import { relative, extname } from "node:path"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.js"),
      name: "MyLib",
      // the proper extensions will be added
      fileName: "my-lib",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync("src/**/*.{ts,tsx}", {
          ignore: ["src/**/*.d.ts"],
        }).map((file) => [
          // The name of the entry point
          // src/nested/foo.ts becomes nested/foo
          relative("src", file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          // src/nested/foo.ts becomes /project/src/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
      output: {
        // Put chunk files at <output>/chunks
        chunkFileNames: "chunks/[name].[hash].js",
        // Put chunk styles at <output>/assets
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
    }),
    libInjectCss(),
  ],
})
