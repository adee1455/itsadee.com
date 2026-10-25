"use client";

import { useEffect, useRef, useState } from "react";

const bulletItems = [
  "I’m Adee Shaikh, a product-focused software developer who enjoys turning ideas into useful, thoughtfully crafted products.",
  "I build software across different platforms, explore AI-powered solutions, and combine engineering with product thinking to take ideas from concept to launch.",
  "I’m fascinated by the intersection of technology, user experience, and business, and how the right ideas can become products that solve real problems.",
];

export function AboutBullets() {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeItems, setActiveItems] = useState<boolean[]>([true, false, false]);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      if (!listRef.current) return;
      const lis = listRef.current.querySelectorAll("li");
      const scrollY = window.scrollY || window.pageYOffset || 0;

      // When at the top of the page, ONLY bullet 1 is dark (bullets 2 & 3 must start grey on any display size)
      if (scrollY < 40) {
        setActiveItems((prev) => (prev[1] || prev[2] ? [true, false, false] : prev));
        return;
      }

      // When scrolled down, activate points progressively as they enter the comfortable reading zone
      setActiveItems((prev) => {
        const next = [true, false, false];

        lis.forEach((li, idx) => {
          if (idx === 0) return;
          const rect = li.getBoundingClientRect();
          // Reading focus threshold: idx 1 triggers when <= 68% of viewport, idx 2 when <= 60%
          const trigger = window.innerHeight * (0.68 - (idx - 1) * 0.08);
          if (rect.top <= trigger) {
            next[idx] = true;
          }
        });

        const changed = next.some((val, i) => val !== prev[i]);
        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ul className="about-bullets" ref={listRef}>
      {bulletItems.map((text, idx) => (
        <li key={idx} className={activeItems[idx] ? "is-active" : ""}>
          {text}
        </li>
      ))}
    </ul>
  );
}
