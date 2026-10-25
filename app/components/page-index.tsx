"use client";

import { useEffect, useState } from "react";

const items = [
  { label: "Intro", href: "#top", id: "top" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#work", id: "work" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Activity", href: "#activity", id: "activity" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Tech Stack", href: "#stack", id: "stack" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function PageIndex() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.6] }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="page-index" aria-label="Page sections">
      <span className="page-index-title">INDEX</span>
      <nav>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={active === item.id ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
