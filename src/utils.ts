import { logger } from 'rslog';
import handlebars from 'handlebars';
import fs from 'node:fs';
import { URL } from 'node:url';

export const clearRoute = (route: string): string => route.replace(/(^\/|\/$)/g, '');

export const getRoutePath = (routePrefix: string, routePath: string): string => {
  return `/${clearRoute(routePrefix)}/${clearRoute(routePath)}`;
};

export const getTemplate = (templatePath: string | undefined, defaultTemplate: string) => {
  if (!templatePath || !fs.existsSync(templatePath)) {
    return handlebars.compile(defaultTemplate);
  }
  return handlebars.compile(fs.readFileSync(templatePath).toString());
};

function clearNotes(content: string): string {
  return content.replace(/<!--[\s\S]*?-->/g, '').trim();
}

export async function getGithubReleases(repo: string): Promise<any[]> {
  try {
    let releases = [];
    logger.start(`Fetching releases for ${repo}...`);
    const resp = await fetch(`https://api.github.com/repos/${repo}/releases`).then((res) => res.json());
    if (Array.isArray(resp)) {
      releases = resp.map((item) => ({ ...item, body: clearNotes(item.body) }));
    } else {
      logger.error('Failed to fetch releases', resp);
    }
    return releases;
  } catch (error) {
    logger.error('Failed to fetch releases', error);
    return [];
  }
}

export async function getGitlabReleases(repo: string, { baseUrl = 'https://gitlab.com', headers = {} } = {}) {
  try {
    let releases = [];
    logger.start(`Fetching releases for ${repo}...`);
    const url = new URL(`/api/v4/projects/${encodeURIComponent(repo)}/releases`, baseUrl);
    const resp = await fetch(url.toString(), { headers }).then((res) => res.json());
    if (Array.isArray(resp)) {
      releases = resp.map((item) => ({ ...item, description: clearNotes(item.description) }));
    } else {
      logger.error('Failed to fetch releases', resp);
    }
  } catch (error) {
    logger.error('Failed to fetch releases', error);
    return [];
  }
}
