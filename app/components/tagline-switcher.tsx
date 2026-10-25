"use client";

import { useEffect, useState, useRef } from "react";

interface TaglineSwitcherProps {
  items: string[];
  interval?: number; // seconds between flips
}

export function TaglineSwitcher({
  items,
  interval = 2.8,
}: TaglineSwitcherProps) {
  const [index, setIndex] = useState(0);
  const [animState, setAnimState] = useState<"entering" | "exiting" | "prepared">("entering");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (items.length <= 1) return;

    const runFlip = () => {
      // Step 1: Exit current text downwards
      setAnimState("exiting");

      // Step 2: Swap text and prepare above
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setAnimState("prepared");

        // Step 3: Next frame, animate into place
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimState("entering");
          });
        });
      }, 300);
    };

    timerRef.current = setInterval(runFlip, interval * 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items, interval]);

  return (
    <span className="tagline-flip-container" aria-label={items[index]}>
      <span className={`tagline-flip-text is-${animState}`}>
        {items[index]}
      </span>
    </span>
  );
}
