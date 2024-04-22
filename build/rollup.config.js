import analyze from "rollup-plugin-analyzer";
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";

const base = {
  input: "src/index.js",
  plugins: [
    esbuild(),
    postcss(),
    analyze({ summaryOnly: true, hideDeps: true })
  ],
  external: ["vue-demi"]
};

const config = [
  Object.assign({}, base, {
    output: {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: true
    }
  }),
  Object.assign({}, base, {
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true
    }
  })
];

export default config;
