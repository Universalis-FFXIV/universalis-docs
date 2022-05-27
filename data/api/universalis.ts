export const website = 'https://universalis.app';

export function buildUrl(path: string, query?: URLSearchParams): string {
  let url = `${website}${path}`;
  if (query != null) {
    url += `?${query.toString()}`;
  }

  return url;
}

export function getSchemaUrl(version: string): string {
  return `${website}/swagger/${version}/swagger.json`;
}
