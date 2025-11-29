"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Repo {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
}

export default function Portfolio() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/LaLangousteFolle/repos",
        );
        const data = await response.json();
        const formatted = data
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 11)
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || "No description",
            stars: repo.stargazers_count,
            language: repo.language || "Other",
            url: repo.html_url,
          }));
        setRepos(formatted);
      } catch (error) {
        console.error("Failed to fetch repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Portfolio</h1>
            <p className="text-slate-400">Mes projets GitHub</p>
          </div>

          {loading ? (
            <p className="text-slate-400">Chargement...</p>
          ) : (
            <div className="grid gap-6">
              {repos.map((repo) => (
                <Link key={repo.name} href={repo.url} target="_blank">
                  <Card className="hover:border-cyan-400 transition cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-cyan-400">
                            {repo.name}
                          </CardTitle>
                          <CardDescription>{repo.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{repo.language}</Badge>
                        <Badge variant="outline">⭐ {repo.stars}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
