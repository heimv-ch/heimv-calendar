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
      bundleTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.es.js",
      cssFileName: "index",
    },
    rollupOptions: {
      external: (id) =>
        ["react", "react-dom", "date-fns", "@floating-ui/react"].some((pkg) => id === pkg || id.startsWith(`${pkg}/`)),
    },
    emptyOutDir: true,
  },
});
