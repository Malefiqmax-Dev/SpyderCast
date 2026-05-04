import { PLAYER_CONFIG } from "./constants/player";

export async function fetchFastFluxSource(tmdbId: number, mediaType: "movie" | "tv", season?: number, episode?: number) {
  let url = "";
  if (mediaType === "movie") {
    url = `${PLAYER_CONFIG.BASE_URL}?route=movies/${tmdbId}&api_key=${PLAYER_CONFIG.API_KEY}`;
  } else {
    url = `${PLAYER_CONFIG.BASE_URL}?route=series/${tmdbId}&api_key=${PLAYER_CONFIG.API_KEY}`;
  }

  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();

  if (!data.success) return null;

  if (mediaType === "movie") {
    // data.data might be an array or an object depending on the route
    const movieData = Array.isArray(data.data) ? data.data[0] : data.data;
    return movieData?.source?.url || null;
  } else {
    // For series, it returns seasons and episodes
    const seriesData = data.data;
    const seasonData = seriesData.seasons?.find((s: any) => s.season_number === season);
    const episodeData = seasonData?.episodes?.find((e: any) => e.episode_number === episode);
    return episodeData?.source?.url || null;
  }
}
