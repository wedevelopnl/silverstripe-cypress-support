import fs from 'fs'
import del from 'rollup-plugin-delete';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import copy from 'rollup-plugin-copy';

const pkg = JSON.parse(fs.readFileSync('./package.json'));

export default {
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
  external: ['cypress-commands'],
  plugins: [
    // Delete contents of target folder
    del({
      targets: pkg.files,
    }),

    // Resolve JSON files
    json(),

    // Compile to commonjs and bundle
    commonjs(),

    // Copy type definitions to target folder
    copy({
      targets: [
        { src: './src/support/*.js', dest: './dist/support/' },
      ],
    }),
  ],

  external: [...Object.keys(pkg.dependencies || {})],
};
