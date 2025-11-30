"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type NowPlayingData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string | null;
  songUrl?: string;
  progressMs?: number;
  durationMs?: number;
};

export function NowPlayingCard() {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [tick, setTick] = useState(0);

  // Fetch toutes les 5s
  useEffect(() => {
    const fetchNowPlaying = async () => {
      const res = await fetch("/api/spotify/now-playing");
      const json = (await res.json()) as NowPlayingData;
      setData(json);
      setLastUpdate(Date.now());
      setTick(0);
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 5000);
    return () => clearInterval(interval);
  }, []);

  // Timer local
  useEffect(() => {
    if (!data?.isPlaying || !lastUpdate) return;
    const interval = setInterval(() => {
      setTick((t) => t + 200);
    }, 200);
    return () => clearInterval(interval);
  }, [data?.isPlaying, lastUpdate]);

  // Toujours calculer à partir de data (même si null)
  const baseProgressMs = data?.progressMs ?? 0;
  const durationMs = data?.durationMs ?? 0;
  const isPlaying = data?.isPlaying ?? false;

  const { displayProgressMs, displayProgressPercent } = useMemo(() => {
    if (!isPlaying || !durationMs) {
      return { displayProgressMs: baseProgressMs, displayProgressPercent: 0 };
    }

    const extraMs = tick;
    const currentMs = Math.min(baseProgressMs + extraMs, durationMs);
    const percent = (currentMs / durationMs) * 100;

    return {
      displayProgressMs: currentMs,
      displayProgressPercent: percent,
    };
  }, [isPlaying, durationMs, baseProgressMs, tick]);

  if (!data) return null;

  const { title, artist, album, albumImageUrl, songUrl } = data;

  const formatTime = (ms?: number) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (!isPlaying) {
    return (
      <Card className="bg-slate-800/60 border-slate-700">
        <CardHeader>
          <CardTitle className="text-sm text-slate-300">Spotify</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-sm">
            Rien n&apos;est en lecture pour l&apos;instant.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700">
      <CardContent className="flex items-center gap-4 p-4">
        {albumImageUrl && (
          <a href={songUrl} target="_blank" rel="noopener noreferrer">
            <img
              src={albumImageUrl}
              alt={album ?? "Album cover"}
              className="w-16 h-16 rounded-md shadow"
            />
          </a>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase text-cyan-400 mb-1">Now Playing</p>
          <a
            href={songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-100 truncate"
          >
            {title}
          </a>
          <p className="text-sm text-slate-400 truncate">
            {artist} • {album}
          </p>

          <div className="mt-2 space-y-1">
            <Progress
              value={displayProgressPercent}
              className="h-1 bg-slate-700"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>{formatTime(displayProgressMs)}</span>
              <span>{formatTime(durationMs)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
