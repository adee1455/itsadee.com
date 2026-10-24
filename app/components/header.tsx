"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Activity", href: "#activity" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Back to top">
        itsadee.com
      </a>
      <nav className={open ? "main-nav open" : "main-nav"} aria-label="Main navigation">
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header-controls">
        <ThemeToggle />
        <button
          className="menu-button icon-button"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={17} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
