import fs from 'fs'
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import { preserveShebangs } from 'rollup-plugin-preserve-shebangs';

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
    ],

    plugins: [
      preserveShebangs(),
      json(),
      nodeResolve(),
      commonjs(),
    ],

    external: ['fs', 'zlib'],
  },
];