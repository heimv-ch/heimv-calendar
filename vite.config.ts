import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({
			tsconfigPath: "tsconfig.app.json",
			exclude: ["src/main.tsx", "src/App.tsx"],
		}),
	],
	build: {
		lib: {
			entry: "src/index.ts",
			name: packageJson.name,
			formats: ["es", "umd"],
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "date-fns", "@floating-ui/react"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		cssCodeSplit: true,
		emptyOutDir: true,
	},
});
