// vite.config.ts
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
var vite_config_default = defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3e3
  },
  build: {
    target: "esnext"
  }
});
export {
  vite_config_default as default
};
