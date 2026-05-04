import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = searchParams.get("page") || "1"
  const token = process.env.TMDB_API_TOKEN

  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?language=fr-FR&page=${page}&sort_by=popularity.desc`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  })

  const data = await res.json()
  return NextResponse.json(data)
}
