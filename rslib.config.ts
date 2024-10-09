import { defineConfig, LibConfig } from '@rslib/core';
import fs from 'node:fs';
import path from 'node:path';

const shared: LibConfig = {
  dts: {
    bundle: false,
  },
};

function getDefaultTemplates() {
  const templateDir = path.resolve(__dirname, './template');
  const templateExt = '.handlebars';
  const templateFiles = fs.readdirSync(templateDir).filter((item) => item.endsWith(templateExt));
  const result: Record<string, string> = {};
  templateFiles.forEach((item) => {
    const key = `process.env.DEFAULT_TEMPLATES_${path.basename(item, templateExt).replace(/-/, '_').toUpperCase()}`;
    const value = JSON.stringify(fs.readFileSync(path.resolve(templateDir, item), 'utf-8'));
    result[key] = value;
  });
  return result;
}

export default defineConfig({
  lib: [
    {
      ...shared,
      format: 'esm',
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      ...shared,
      format: 'cjs',
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
  ],
  output: {
    target: 'node',
  },
  source: {
    define: {
      ...getDefaultTemplates(),
    },
  },
});
