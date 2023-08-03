import fs from 'fs'
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
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
    input: './src/tasks/index.js',
    output: [
      {
        file: 'dist/silverstripe-cypress-tasks.js',
        format: 'cjs',
        globals: {
          Cypress: 'cypress',
        },
      },
      { file: 'dist/silverstripe-cypress-tasks.mjs', format: 'es' },
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
      commonjs(),
    ],

    external: [...Object.keys(pkg.dependencies || {}), 'fs', 'zlib'],
  },
];