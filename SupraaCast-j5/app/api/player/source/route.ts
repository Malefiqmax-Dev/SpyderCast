import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchFastFluxSource } from "@/lib/fastflux";

export async function POST(req: NextRequest) {
  try {
    const { tmdbId, mediaType, season, episode, turnstileToken } = await req.json();

    if (!tmdbId || !mediaType || !turnstileToken) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Verify Turnstile Token
    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAADJDCzkBDMkWPzRHaeaT6OSI6PQ",
        response: turnstileToken,
      }),
    });

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 });
    }

    const supabase = await createClient();

    // Check Cache
    const { data: cached } = await supabase
      .from("fastflux_cache")
      .select("source_url")
      .eq("tmdb_id", tmdbId)
      .eq("media_type", mediaType)
      .eq("season", season ?? null)
      .eq("episode", episode ?? null)
      .single();

    if (cached?.source_url) {
      return NextResponse.json({ url: cached.source_url });
    }

    // Fetch from FastFlux
    const sourceUrl = await fetchFastFluxSource(tmdbId, mediaType, season, episode);

    if (!sourceUrl) {
      return NextResponse.json({ error: "Source not found" }, { status: 404 });
    }

    // Fetch TMDb Metadata for storage
    let metadata = {};
    try {
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${tmdbId}?language=fr-FR`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTAxNWFmZjM3ZjM5ODY5NzM5ODk3YWUzZGNlZmU5MiIsIm5iZiI6MTc3MDg0MjcxNi45ODgsInN1YiI6IjY5OGNlYTVjNDFjOTYwZGNjZmIzMGYwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rq0-m_bJcToSKDOJpaL0U0L3xfLfNut9zD5rCm2clak"}`,
          },
        }
      );
      if (tmdbRes.ok) {
        metadata = await tmdbRes.json();
      }
    } catch (e) {
      console.error("Failed to fetch TMDb metadata for caching:", e);
    }

    // Cache it
    await supabase.from("fastflux_cache").upsert({
      tmdb_id: tmdbId,
      media_type: mediaType,
      season: season ?? null,
      episode: episode ?? null,
      source_url: sourceUrl,
      metadata: metadata,
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json({ url: sourceUrl });
  } catch (error: any) {
    console.error("API player source error details:", error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}
