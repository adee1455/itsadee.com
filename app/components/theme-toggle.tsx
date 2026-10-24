"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      className="icon-button"
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun className="theme-sun" size={16} strokeWidth={1.8} />
      <Moon className="theme-moon" size={16} strokeWidth={1.8} />
    </button>
  );
}
