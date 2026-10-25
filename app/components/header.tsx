"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Writing", href: "#writing" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="site-header">
      <Link className="wordmark" href={isHome ? "#top" : "/"} aria-label="Back to top">
        itsadee.com
      </Link>
      <nav className={open ? "main-nav open" : "main-nav"} aria-label="Main navigation">
        {navigation.map((item) => {
          const targetHref = item.href.startsWith("#")
            ? isHome
              ? item.href
              : `/${item.href}`
            : item.href;

          return (
            <Link
              key={item.label}
              href={targetHref}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
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
