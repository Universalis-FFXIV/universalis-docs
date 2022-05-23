export const website = 'https://universalis.app';

export async function request(method: string, path: string, query?: URLSearchParams): Promise<any> {
  let url = `${website}/${path}`;
  if (query != null) {
    url += `?${query.toString()}`;
  }

  console.log(`Making ${method} request to ${url}`);
  return fetch(url, { method }).then((res) => res.json());
}

export function getSchemaUrl(version: string): string {
  return `${website}/docs/swagger/${version}/swagger.json`;
}
