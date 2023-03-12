// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///home/pb/youknown/node_modules/.pnpm/registry.npmmirror.com+vite@3.2.5_te37c6x2yeeivwe5a7pjficfzi/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///home/pb/youknown/node_modules/.pnpm/registry.npmmirror.com+vite-tsconfig-paths@3.6.0_vite@3.2.5/node_modules/vite-tsconfig-paths/dist/index.mjs";
import react from "file:///home/pb/youknown/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-react@2.2.0_vite@3.2.5/node_modules/@vitejs/plugin-react/dist/index.mjs";
import styleInject from "file:///home/pb/youknown/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-css-injected-by-js@2.4.0_vite@3.2.5/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "/home/pb/youknown/packages/react-hook";
var vite_config_default = defineConfig({
  base: "",
  plugins: [tsconfigPaths(), react(), styleInject()],
  build: {
    lib: {
      formats: ["es"],
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "main",
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      plugins: [],
      external: ["react", "react-dom"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wYi95b3Vrbm93bi9wYWNrYWdlcy9yZWFjdC1ob29rXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wYi95b3Vrbm93bi9wYWNrYWdlcy9yZWFjdC1ob29rL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3BiL3lvdWtub3duL3BhY2thZ2VzL3JlYWN0LWhvb2svdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHN0eWxlSW5qZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0YmFzZTogJycsXG5cdHBsdWdpbnM6IFt0c2NvbmZpZ1BhdGhzKCksIHJlYWN0KCksIHN0eWxlSW5qZWN0KCldLFxuXHRidWlsZDoge1xuXHRcdGxpYjoge1xuXHRcdFx0Zm9ybWF0czogWydlcyddLFxuXHRcdFx0ZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG5cdFx0XHRuYW1lOiAnbWFpbicsXG5cdFx0XHRmaWxlTmFtZTogZm9ybWF0ID0+IGBtYWluLiR7Zm9ybWF0fS5qc2Bcblx0XHR9LFxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdHBsdWdpbnM6IFtdLFxuXHRcdFx0ZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJ11cblx0XHR9XG5cdH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlTLFNBQVMsZUFBZTtBQUN6VCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFKeEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLGNBQWMsR0FBRyxNQUFNLEdBQUcsWUFBWSxDQUFDO0FBQUEsRUFDakQsT0FBTztBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0osU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVSxZQUFVLFFBQVE7QUFBQSxJQUM3QjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2QsU0FBUyxDQUFDO0FBQUEsTUFDVixVQUFVLENBQUMsU0FBUyxXQUFXO0FBQUEsSUFDaEM7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
