import analyze from "rollup-plugin-analyzer";
import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";
import { terser } from 'rollup-plugin-terser';

const base = {
  input: "src/index.js",
  plugins: [
    esbuild(),
    postcss(),
    terser({
      mangle: true,
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }),
    analyze({ summaryOnly: true, hideDeps: true })
  ]
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
