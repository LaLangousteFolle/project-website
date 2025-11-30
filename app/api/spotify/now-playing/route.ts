import { NextResponse } from "next/server";

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN,
} = process.env;

const BASIC = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString("base64");

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh Spotify token");
  }

  return (await res.json()) as { access_token: string };
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      }
    );

    if (res.status === 204 || res.status >= 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await res.json();

    if (!data.item || data.currently_playing_type !== "track") {
      return NextResponse.json({ isPlaying: false });
    }

    const item = data.item;
    const artist = item.artists.map((a: any) => a.name).join(", ");
    const albumImageUrl = item.album.images?.[0]?.url ?? null;

    return NextResponse.json({
      isPlaying: data.is_playing as boolean,
      title: item.name as string,
      artist,
      album: item.album.name as string,
      albumImageUrl,
      songUrl: item.external_urls.spotify as string,
      progressMs: data.progress_ms ?? 0,
      durationMs: item.duration_ms ?? 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ isPlaying: false });
  }
}
