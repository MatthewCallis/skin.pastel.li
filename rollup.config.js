/* eslint no-console: 0 */
// const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const minify = require('uglify-es').minify;

const format = 'app';
const config = {
  entry: `./src//${format}.js`,
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      main: true,
      preferBuiltins: false,
    }),
    json({
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      runtimeHelpers: false,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    uglify({}, minify),
  ],
  format: 'es',
  dest: `./${format}.js`,
};

export default config;
