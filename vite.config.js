import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import istanbul from "vite-plugin-istanbul";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import requireTransform from "vite-plugin-require-transform";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

export default defineConfig((config) => {
  const { mode, command } = config;
  return {
    root: process.cwd(),
    base: "./",
    build: {
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            var info = assetInfo.name.split(".");
            var extType = info[info.length - 1];
            if (/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `static/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
        },
      },
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
    },
    plugins: [
      vue(),
      VueSetupExtend(),
      legacy({
        targets: ["> 1%", "last 2 versions", "not ie <= 8", "iOS >= 7"],
        polyfills: [
          "es.promise",
          "es.symbol",
          "es.array.iterator",
          "es.object.assign",
          "es.promise.finally",
        ],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        modernPolyfills: ["es.global-this"],
      }),
      requireTransform({
        fileRegex: /.js$|.vue$/,
      }),

      istanbul({
        include: "src/*",
        exclude: ["node_modules"],
        extension: [".js", ".ts", ".vue"],
        forceBuildInstrument: true,
      }),
      Components({
        resolvers: [VantResolver()],
        sourcemap: true,
      }),
    ],
  };
});
