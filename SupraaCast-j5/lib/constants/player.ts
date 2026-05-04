export const PLAYER_CONFIG = {
  BASE_URL: "https://fastflux.xyz/api/v1/index.php",
  API_KEY: "ff_62cc6bc4d01e712f42a8442258fe9181a3365e7c97822de272b6efd77b8f02c0",
} as const;

export function getMoviePlayerUrl(tmdbId: number) {
  return `${PLAYER_CONFIG.BASE_URL}?route=movies/${tmdbId}/player&api_key=${PLAYER_CONFIG.API_KEY}`;
}

export function getSeriesPlayerUrl(tmdbId: number, season: number, episode: number) {
  return `${PLAYER_CONFIG.BASE_URL}?route=series/${tmdbId}/player&season=${season}&episode=${episode}&api_key=${PLAYER_CONFIG.API_KEY}`;
}
