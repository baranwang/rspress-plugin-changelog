import type { AdditionalPage, RspressPlugin } from '@rspress/shared';
import { DEFAULT_TEMPLATES } from './constants';
import { clearRoute, getGithubReleases, getGitlabReleases, getRoutePath, getTemplate } from './utils';

interface GithubReleasesItem {
  type: 'github-releases';
  routePath: string;
  repo: `${string}/${string}`;
  title?: string;
  templatePath?: string;
}

interface GitLabReleasesItem {
  type: 'gitlab-releases';
  routePath: string;
  repo: `${string}/${string}`;
  /**
   * GitLab domain
   * @default 'https://gitlab.com'
   */
  baseUrl?: string;
  headers?: Record<string, string>;
  title?: string;
  templatePath?: string;
}

export interface ChangelogPluginOptions {
  /**
   * 是否在开发环境下获取数据
   * @default true
   */
  fetchOnDev?: boolean;
  items: Array<GithubReleasesItem | GitLabReleasesItem>;
  routePrefix?: string;
  addSidebar?: boolean | 'auto';
}

export function pluginChangelog({ fetchOnDev = true, items = [], routePrefix = 'changelog', addSidebar = 'auto' }: ChangelogPluginOptions): RspressPlugin {
  return {
    name: 'plugin-changelog',

    addPages: async (_, isProd) => {
      const needFetch = isProd || fetchOnDev;
      const pages: AdditionalPage[] = [];
      for (const item of items) {
        if (needFetch) {
          if (item.type === 'github-releases') {
            const releases = getGithubReleases(item.repo);
            const template = getTemplate(item.templatePath, DEFAULT_TEMPLATES.GITHUB_RELEASES);
            pages.push({
              routePath: getRoutePath(routePrefix, item.routePath),
              content: template({ releases, title: item.title || item.repo }),
            });
          }
          if (item.type === 'gitlab-releases') {
            const releases = getGitlabReleases(item.repo, { baseUrl: item.baseUrl, headers: item.headers });
            const template = getTemplate(item.templatePath, DEFAULT_TEMPLATES.GITLAB_RELEASES);
            pages.push({
              routePath: getRoutePath(routePrefix, item.routePath),
              content: template({ releases, title: item.title || item.repo }),
            });
          }
        } else {
          pages.push({
            routePath: getRoutePath(routePrefix, item.routePath),
            content: ':::tip\n已关闭开发环境拉取 Changelog 功能\n:::',
          });
        }
      }
      return pages;
    },
    config(config) {
      if (!addSidebar) {
        return config;
      }
      if (addSidebar === 'auto' && items.length === 1) {
        return config;
      }
      config.themeConfig ??= {};
      config.themeConfig.sidebar ??= {};
      config.themeConfig.sidebar[`/${clearRoute(routePrefix)}/`] = items.map((item) => ({
        text: item.title || item.repo,
        link: getRoutePath(routePrefix, item.routePath),
      }));
      return config;
    },
  };
}
