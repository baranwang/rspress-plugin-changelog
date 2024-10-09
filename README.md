# rspress-plugin-changelog

This plugin generates changelog pages for your Rspress documentation site, fetching release information from GitHub and GitLab repositories.

## Installation

```bash
npm install rspress-plugin-changelog
```

## Usage

Add the plugin to your Rspress configuration file:

```javascript
import { defineConfig } from 'rspress/config';
import { pluginChangelog } from 'rspress-plugin-changelog';

export default defineConfig({
  plugins: [
    pluginChangelog({
      fetchOnDev: true,
      items: [
        {
          type: 'github-releases',
          routePath: '/github-changelog',
          repo: 'owner/repo',
          title: 'GitHub Changelog',
        },
        {
          type: 'gitlab-releases',
          routePath: '/gitlab-changelog',
          repo: 'owner/repo',
          title: 'GitLab Changelog',
        },
      ],
      routePrefix: 'changelog',
      addSidebar: 'auto',
    }),
  ],
});
```

## Configuration Options

The `pluginChangelog` function accepts an options object with the following properties:

- `fetchOnDev` (boolean, default: `true`): Whether to fetch changelog data in development environment.
- `items` (array): An array of changelog items to fetch and display.
- `routePrefix` (string, default: `'changelog'`): The prefix for changelog routes.
- `addSidebar` (boolean | 'auto', default: `'auto'`): Whether to add changelog links to the sidebar.

### Changelog Item Options

Each item in the `items` array can have the following properties:

#### GitHub Releases

- `type`: 'github-releases'
- `routePath` (string): The route path for this changelog.
- `repo` (string): The GitHub repository in the format `'owner/repo'`.
- `title` (string, optional): The title for the changelog page.
- `templatePath` (string, optional): Custom template path for rendering the changelog.

#### GitLab Releases

- `type`: 'gitlab-releases'
- `routePath` (string): The route path for this changelog.
- `repo` (string): The GitLab repository in the format `'owner/repo'`.
- `baseUrl` (string, optional): The GitLab domain. Defaults to 'https://gitlab.com'.
- `headers` (object, optional): Additional headers for GitLab API requests.
- `title` (string, optional): The title for the changelog page.
- `templatePath` (string, optional): Custom template path for rendering the changelog.

## Features

- Fetches release information from GitHub and GitLab repositories.
- Generates changelog pages with customizable routes.
- Supports custom templates for rendering changelogs.
- Automatically adds changelog links to the sidebar (configurable).
- Allows fetching data in both production and development environments.

## Demo
https://baranwang.github.io/rspress-plugin-changelog/demo/rspack

## License

[MIT License](LICENSE)
