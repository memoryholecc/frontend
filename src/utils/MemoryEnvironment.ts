interface Env {
  GRAPHQL_ENDPOINT: string;
  SCRAPER_ROOT: string;
}

export const env: Env = {
  GRAPHQL_ENDPOINT: import.meta.env.VITE_GRAPHQL_ENDPOINT?.toString() ?? '',
  SCRAPER_ROOT: import.meta.env.VITE_SCRAPER_ROOT?.toString() ?? '',
};
