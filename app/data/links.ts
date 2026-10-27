export interface SocialCard {
  id: string;
  name: string;
  handle: string;
  href: string;
  badge?: string;
  icon: "instagram" | "x" | "github" | "linkedin" | "mail" | "calendar";
  accentColor: string;
  gradient: string;
}

export interface WebsiteCard {
  title: string;
  handle: string;
  href: string;
  badge: string;
  accentColor: string;
  gradient: string;
}

export interface BioProfile {
  name: string;
  handle: string;
  tagline: string;
  location: string;
  timezone: string;
  avatar: string;
  websiteUrl: string;
}

export const bioProfile: BioProfile = {
  name: "Adee Shaikh",
  handle: "@shaikh__adee",
  tagline: "building cool things on the internet.",
  location: "Nashik, India",
  timezone: "Asia/Kolkata",
  avatar: "/avatar.png",
  websiteUrl: "https://itsadee.com",
};

export const socialCards: SocialCard[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@shaikh__adee",
    href: "https://instagram.com/shaikh__adee",
    badge: "Follow",
    icon: "instagram",
    accentColor: "#e1306c",
    gradient: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
  },
  {
    id: "x",
    name: "X (Twitter)",
    handle: "@hey_itsadee",
    href: "https://x.com/hey_itsadee",
    badge: "Connect",
    icon: "x",
    accentColor: "#1da1f2",
    gradient: "linear-gradient(135deg, #09090b, #27272a)",
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@adee1455",
    href: "https://github.com/adee1455",
    badge: "Code",
    icon: "github",
    accentColor: "#8b5cf6",
    gradient: "linear-gradient(135deg, #24292e, #4c1d95)",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "in/adeeshaikh",
    href: "https://www.linkedin.com/in/adeeshaikh",
    badge: "Connect",
    icon: "linkedin",
    accentColor: "#0a66c2",
    gradient: "linear-gradient(135deg, #0a66c2, #0284c7)",
  },
  {
    id: "calendar",
    name: "Schedule a Call",
    handle: "cal.com/adeeshaikh/30min",
    href: "https://cal.com/adeeshaikh/30min",
    badge: "30 Min",
    icon: "calendar",
    accentColor: "#2563eb",
    gradient: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
  },
  {
    id: "mail",
    name: "Direct Email",
    handle: "hello@itsadee.com",
    href: "mailto:hello@itsadee.com",
    badge: "Say Hi",
    icon: "mail",
    accentColor: "#ff6b4a",
    gradient: "linear-gradient(135deg, #f43f5e, #ea580c)",
  },
];

export const websiteCard: WebsiteCard = {
  title: "Visit Website",
  handle: "itsadee.com",
  href: "https://itsadee.com",
  badge: "itsadee.com ↗",
  accentColor: "#6366f1",
  gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
};
