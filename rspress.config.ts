import path from 'node:path';
import { defineConfig } from 'rspress/config';
import { pluginChangelog } from '.';

export default defineConfig({
  base: '/rspress-plugin-changelog/',
  root: path.join(__dirname, 'docs'),
  title: 'rspress-plugin-changelog',
  themeConfig: {
    socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/baranwang/rspress-plugin-changelog' }],
  },
  plugins: [
    pluginChangelog({
      routePrefix: 'demo',
      items: [
        {
          type: 'github-releases',
          title: 'Rspack',
          routePath: 'rspack',
          repo: 'web-infra-dev/rspack',
        },
        {
          type: 'github-releases',
          title: 'rsbuild',
          routePath: 'rsbuild',
          repo: 'web-infra-dev/rsbuild',
        },
        {
          type: 'github-releases',
          title: 'rspress',
          routePath: 'rspress',
          repo: 'web-infra-dev/rspress',
        },
        {
          type: 'github-releases',
          title: 'rslib',
          routePath: 'rslib',
          repo: 'web-infra-dev/rslib',
        }
      ],
    }),
  ],
});
