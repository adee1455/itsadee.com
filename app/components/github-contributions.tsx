"use client";

import { useEffect, useState } from "react";
import { GitCommit, ArrowUpRight } from "lucide-react";
import fallbackData from "../data/github-contributions.json";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total?: { lastYear?: number; [year: string]: number | undefined };
  contributions?: ContributionDay[];
}

const calcLevel = (count: number) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

export function GitHubContributions() {
  const [data, setData] = useState<{ total: number; days: ContributionDay[] }>({
    total: fallbackData.total?.lastYear ?? 767,
    days: fallbackData.contributions as ContributionDay[],
  });
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((json) => {
        if (json.contributions && json.contributions.length > 0) {
          setData({
            total: json.total?.lastYear ?? 767,
            days: json.contributions,
          });
        }
      })
      .catch(() => {
        // Fallback data remains in place
      });
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Group days into 7-day columns
  const days = data.days;
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Calculate month labels
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = "";
  weeks.forEach((week, wIndex) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" });
      if (month !== lastMonth) {
        monthLabels.push({ label: month, weekIndex: wIndex });
        lastMonth = month;
      }
    }
  });

  return (
    <div className="github-widget">
      <div className="github-header">
        <div className="github-title-group">
          <GitCommit size={15} className="github-icon" />
          <span className="github-title">GitHub Activity</span>
          <span className="github-dot">·</span>
          <span className="github-meta">
            <strong>{data.total.toLocaleString()}</strong> contributions in the last year
          </span>
        </div>
        <div className="github-accounts">
          <a
            href="https://github.com/adee1455"
            target="_blank"
            rel="noreferrer"
            className="github-profile-link"
            title="View @adee1455 on GitHub"
          >
            <span>@adee1455</span>
            <span className="github-account-count">(203)</span>
            <ArrowUpRight size={12} />
          </a>
          <span className="github-account-sep">&</span>
          <a
            href="https://github.com/adeeshaikhcs"
            target="_blank"
            rel="noreferrer"
            className="github-profile-link"
            title="View @adeeshaikhcs on GitHub"
          >
            <span>@adeeshaikhcs</span>
            <span className="github-account-count">(564)</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="github-graph-container">
        <div className="github-graph-inner">
          {/* Month headers */}
          <div className="github-months" aria-hidden="true">
            {monthLabels.map((m, i) => (
              <span
                key={`${m.label}-${i}`}
                className="github-month-label"
                style={{ left: `${m.weekIndex * 14}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Contribution Matrix */}
          <div className="github-matrix">
            {weeks.map((week, wIdx) => (
              <div className="github-col" key={wIdx}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`github-cell level-${day.level}`}
                    onMouseEnter={() => setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    data-date={day.date}
                    data-count={day.count}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hover info / Tooltip & Legend (Sticky to widget width) */}
      <div className="github-footer">
        <div className="github-tooltip-info">
          {hoveredDay ? (
            <span>
              <strong>{hoveredDay.count}</strong> contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
              {formatDate(hoveredDay.date)}
            </span>
          ) : (
            <span className="github-hint">
              Combined @adee1455 (203) &amp; @adeeshaikhcs (564) · Hover squares for details
            </span>
          )}
        </div>

        <div className="github-legend">
          <span>Less</span>
          <span className="github-cell level-0" />
          <span className="github-cell level-1" />
          <span className="github-cell level-2" />
          <span className="github-cell level-3" />
          <span className="github-cell level-4" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
