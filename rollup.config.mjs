import fs from 'fs'
import buildins from 'rollup-plugin-node-builtins'
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

del({
  targets: pkg.files,
});

export default [
  {
    input: './src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        globals: {
          Cypress: 'cypress',
        },
      },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      commonjs(),
    ],

    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: './src/support/reload-database.js',
    output: [
      {
        file: './dist/support/reload-database.js',
        format: 'cjs',
      },
      { file: pkg.module, format: 'es' },
    ],

    plugins: [
      commonjs(),
    ],

    external: [...Object.keys(pkg.dependencies || {}), 'fs', 'zlib', 'path'],
  },
];