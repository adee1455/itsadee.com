import { NextResponse } from "next/server";

export const revalidate = 900; // Cache on server for 15 minutes

interface DayData {
  date: string;
  count: number;
  level: number;
}

async function fetchUserContributions(username: string): Promise<{ total: number; map: Map<string, number> }> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)",
      },
      next: { revalidate: 900 },
    });
    if (!res.ok) throw new Error(`Failed to fetch ${username}: ${res.status}`);
    const html = await res.text();
    const dayRegex =
      /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>/g;
    let m;
    const map = new Map<string, number>();
    let total = 0;
    while ((m = dayRegex.exec(html)) !== null) {
      const [_, date, _level, tip] = m;
      const numMatch = tip.match(/(\d+)\s+contribution/);
      const count = numMatch ? parseInt(numMatch[1], 10) : 0;
      map.set(date, count);
      total += count;
    }
    return { total, map };
  } catch (err) {
    console.error("Error fetching contributions for", username, err);
    return { total: 0, map: new Map() };
  }
}

export async function GET() {
  const [user1, user2] = await Promise.all([
    fetchUserContributions("adee1455"),
    fetchUserContributions("adeeshaikhcs"),
  ]);

  if (user1.map.size === 0 && user2.map.size === 0) {
    return NextResponse.json({ error: "Could not fetch contributions" }, { status: 500 });
  }

  const allDates = Array.from(new Set([...user1.map.keys(), ...user2.map.keys()])).sort();
  let total = 0;
  const contributions: DayData[] = allDates.map((date) => {
    const count = (user1.map.get(date) || 0) + (user2.map.get(date) || 0);
    total += count;
    let level = 0;
    if (count > 0 && count <= 2) level = 1;
    else if (count <= 5 && count > 2) level = 2;
    else if (count <= 9 && count > 5) level = 3;
    else if (count >= 10) level = 4;
    return { date, count, level };
  });

  return NextResponse.json({
    total: {
      lastYear: total,
      adee1455: user1.total,
      adeeshaikhcs: user2.total,
    },
    contributions,
  });
}
