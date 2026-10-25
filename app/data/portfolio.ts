export type ProjectLink = { label: string; href: string };

export type Project = {
  number: string;
  title: string;
  meta: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  preview?: string;
  hoverPreview?: string;
  video?: string;
  caseStudySlug?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  details: string[];
};

export const socials = [
  { label: "Email", href: "mailto:hello@itsadee.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adeeshaikh" },
  { label: "GitHub", href: "https://github.com/adee1455" },
  { label: "X", href: "https://x.com/hey_itsadee" },
];

export const projects: Project[] = [
  {
    number: "01",
    title: "Fettle",
    meta: "Native macOS utility · Current",
    description:
      "A privacy-first native Mac utility for converting and acting on files where they already live. Its Shift-drag radial menu in Finder keeps common actions close to the cursor, while outputs save safely beside the original files.",
    tags: ["Swift", "AppKit"],
    preview: "/projects/fettle-cover.png",
    video: "/projects/fettle_launch.mp4",
    caseStudySlug: "fettle",
    links: [
      { label: "Website", href: "https://fettle.itsadee.com" },
      { label: "GitHub", href: "https://github.com/adee1455/fettle" },
    ],
  },
  {
    number: "02",
    title: "Rubrii",
    meta: "AI product · 2025",
    description:
      "An AI-powered repertorisation platform for homeopathy practitioners and students. Built from idea through early-user launch at Tentaxaur Studio, with product ownership spanning interface, implementation, and delivery.",
    tags: ["Product engineering", "AI", "Web"],
    preview: "/projects/rubrii-cover.png",
    links: [{ label: "Website", href: "https://rubrii.com" }],
  },
  {
    number: "03",
    title: "DeFile",
    meta: "Web3 product · 2024",
    description:
      "A decentralized file locker that combines encrypted IPFS storage with blockchain-based references and permissions. It won $2,000 across two WalletConnect Build the New Internet hackathon tracks.",
    tags: ["Next.js", "Solidity", "IPFS", "Base"],
    preview: "/projects/defile-cover.png",
    links: [
      { label: "Website", href: "https://defile.vercel.app" },
      { label: "GitHub", href: "https://github.com/adee1455/DeFile" },
    ],
  },
  {
    number: "04",
    title: "StandBy",
    meta: "Ambient display PWA · 2025",
    description:
      "An always-on fullscreen dashboard inspired by the StandBy experience on Apple devices. Features real-time clock, local weather, crypto and stock trackers, pomodoro timer, and customizable widgets in an OLED-friendly display.",
    tags: ["TypeScript", "React"],
    preview: "/projects/standby-cover.png",
    hoverPreview: "/projects/standby-hover.png",
    links: [
      { label: "Website", href: "https://standby.itsadee.com" },
      { label: "GitHub", href: "https://github.com/adee1455/macstandby" },
    ],
  },
];

export const moreWork = [
  { title: "Streetbyte", href: "https://streetbyte.vercel.app", note: "Street-food discovery PWA · Olympiad finalist" },
  { title: "PickUmrah", href: "https://pickumrah.com", note: "Travel product" },
  { title: "RentPay", href: "https://rentpays.vercel.app", note: "Payment-focused web product" },
  { title: "Testie", href: "https://mocktestie.vercel.app", note: "AI mock-test platform" },
  { title: "Neuropal", href: "https://neuropal.in", note: "Mental-wellness product" },
  { title: "Ancestly", href: "https://ancestly.vercel.app", note: "Family tree & archive platform" },
];

export const experiences: Experience[] = [
  {
    company: "Creatoactive Studios",
    role: "Software Developer",
    period: "Jun 2026 – Present",
    details: [
      "Builds client-facing products and features from scratch.",
      "Collaborates on the reasoning behind requirements as well as implementation.",
    ],
  },
  {
    company: "Tentaxaur Studio",
    role: "Product Engineer",
    period: "Mar 2025 – Jun 2026",
    details: [
      "Drove Rubrii from conception to launch as a 0→1 product.",
      "Owned product and engineering work across the interface, stack, and early-user delivery.",
    ],
  },
  {
    company: "Jade Studios",
    role: "Developer",
    period: "Aug 2024 – Feb 2025",
    details: [
      "Delivered client websites and web apps from requirements through deployment and maintenance.",
      "Worked across frontend, backend integrations, CMS, and responsive production delivery.",
    ],
  },
  {
    company: "Neuropal.in",
    role: "Web Developer",
    period: "Feb 2024 – Jul 2024",
    details: [
      "Built responsive frontend features for an AI mental-wellness startup.",
      "Focused on usability and performance in a production product setting.",
    ],
  },
  {
    company: "DataCrush Analytics",
    role: "Web Developer",
    period: "Oct 2023 – Jan 2024",
    details: [
      "Contributed to SaiTv, Sanjivani Banquet, DCA Academy, and Neuropal projects.",
      "Shipped responsive web experiences for real client requirements.",
    ],
  },
  {
    company: "LearnyFox Studio",
    role: "Web Development Intern",
    period: "May 2023 – Aug 2023",
    details: ["Built responsive, user-friendly websites with cross-functional teams."],
  },
];

export const skillGroups = [
  { label: "Web", items: ["TypeScript", "React", "Next.js", "Node.js", "SQL/NoSQL", "Tailwind CSS"] },
  { label: "Product", items: ["0→1 delivery", "Requirements", "UX", "Prioritisation", "Cross-functional coordination"] },
  { label: "Web3 / Emerging", items: ["Solidity", "IPFS", "WalletConnect", "Base", "AWS basics"] },
];
