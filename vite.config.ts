import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "tsconfig.app.json",
      exclude: ["src/example.tsx", "src/ExampleApp.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "date-fns", "@floating-ui/react"],
    },
    cssCodeSplit: true,
    emptyOutDir: true,
  },
});
