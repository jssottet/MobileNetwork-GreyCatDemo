import { basename, dirname, join, resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { defineConfig } from 'vite';
import greycat from '@greycat/web/vite-plugin';

const root = resolve(__dirname, 'frontend');

export default defineConfig((_) => ({
  plugins: [greycat()],
  base: './', // makes generated urls relative to each file
  appType: 'mpa',
  root,
  resolve: {
    alias: {
      // matches the `paths` definitions in `tsconfig.json`
      '~': resolve(__dirname, 'frontend'),
    },
  },
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'webroot'),
    target: 'esnext',
    rollupOptions: {
      input: listHtmlFiles(root),
      output: {
        entryFileNames: (chunk) => {
          let dir = dirname(chunk.facadeModuleId.slice(root.length + 1));
          let name;
          if (dir === '.') {
            dir = '.';
            name = 'index';
          } else {
            name = basename(dir);
          }
          return join(dir, `${name}.js`);
        },
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: {
          greycat: ['@greycat/web'],
        },
      },
    },
  },
}));

function listHtmlFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap(entry => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory() ? listHtmlFiles(fullPath) : (entry.name.endsWith('.html') ? fullPath : []);
  });
}