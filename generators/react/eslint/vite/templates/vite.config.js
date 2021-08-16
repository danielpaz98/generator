import path from "path";

import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import reactJsx from "vite-react-jsx";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), reactJsx(), eslintPlugin()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
});
