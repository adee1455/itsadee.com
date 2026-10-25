import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Mail, MoveRight, Globe, Calendar } from "lucide-react";
import { getAllPosts } from "@/lib/content";

function GithubIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
import { ExperienceList } from "./components/experience-list";
import { Header } from "./components/header";
import { Mascot } from "./components/mascot";
import { PageIndex } from "./components/page-index";
import { GitHubContributions } from "./components/github-contributions";
import { TechStack } from "./components/tech-stack";
import { PiixpalCreature } from "./components/piixpal-creature";
import { TaglineSwitcher } from "./components/tagline-switcher";
import { AboutBullets } from "./components/about-bullets";
import { ProjectCard } from "./components/project-card";
import { experiences, moreWork, projects, socials } from "./data/portfolio";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 2);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://itsadee.com/#person",
        name: "Adee Shaikh",
        url: "https://itsadee.com",
        image: "https://itsadee.com/avatar.png",
        jobTitle: "Software Developer & Product Builder",
        description:
          "Software developer and product builder crafting high-craft native macOS utilities, modern web applications, and decentralized systems.",
        sameAs: [
          "https://github.com/adee1455",
          "https://x.com/hey_itsadee",
          "https://www.linkedin.com/in/adeeshaikh",
        ],
        knowsAbout: [
          "Swift",
          "AppKit",
          "macOS Development",
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Solidity",
          "Web3",
          "Product Engineering",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://itsadee.com/#website",
        url: "https://itsadee.com",
        name: "Adee Shaikh | Software Developer & Product Builder",
        description: "Useful software, built from interface to launch.",
        publisher: { "@id": "https://itsadee.com/#person" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Mascot />
      <div className="shell">
        <Header />
        <div className="content">
          {/* Hero Section */}
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-folio" aria-hidden="true">
              <span>FOLIO / 2026 · PERSONAL DOSSIER</span>
              <span>NASHIK, INDIA</span>
            </div>
            <div className="identity-card">
              <div className="avatar-wrap">
                <Image
                  src="/avatar.png"
                  width={160}
                  height={160}
                  priority
                  alt="Illustrated portrait of Adee Shaikh"
                />
              </div>
              <div className="identity-copy">
                <h1 id="hero-title">Adee Shaikh</h1>
                <p className="role">
                  <span className="role-desktop">
                    Software Developer <span>·</span> Product-minded builder
                  </span>
                  <span className="role-mobile">
                    <TaglineSwitcher items={["Software Developer", "Product-minded builder"]} />
                  </span>
                </p>
                <p className="location">
                  <MapPin size={15} /> Nashik, India
                </p>
              </div>
              <div className="identity-actions">
                <a
                  className="action-btn primary"
                  href="https://cal.com/adeeshaikh/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Calendar size={13} />
                  <span>Book a Call</span>
                  <ArrowUpRight size={12} />
                </a>
                <a className="action-btn" href="#work">
                  <span>View Work</span>
                  <MoveRight size={13} />
                </a>
              </div>
            </div>
          </section>

          {/* Section 01: About */}
          <section className="section about-intro" id="about" aria-labelledby="about-title">
            <div className="section-heading">
              <p>01</p>
              <h2 id="about-title">About</h2>
            </div>
            <div className="about-copy">
              <p className="about-greeting">Hey,</p>
              <AboutBullets />
            </div>
          </section>

          {/* Quick Contact Strip */}
          <section className="section contact-strip" aria-label="Quick contact links">
            {socials.map((social) => (
              <a
                href={social.href}
                key={social.label}
                target={social.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
              >
                {social.label === "Email" ? <Mail size={14} /> : <ArrowUpRight size={13} />}
                <span>{social.label}</span>
              </a>
            ))}
          </section>

          {/* Section 02: Projects */}
          <section className="section" id="work" aria-labelledby="work-title">
            <span className="margin-note left" aria-hidden="true">
              selected work ⤹
            </span>
            <div className="section-heading">
              <p>02</p>
              <h2 id="work-title">Projects</h2>
              <span className="section-note">selected work</span>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            <div className="more-work">
              <p className="eyebrow">More work</p>
              <div className="more-work-grid">
                {moreWork.map((work) => (
                  <a href={work.href} target="_blank" rel="noreferrer" key={work.title}>
                    <strong>{work.title}</strong>
                    <span>{work.note}</span>
                    <ArrowUpRight size={13} />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Section 03: Writing */}
          <section className="section writing-home-section" id="writing" aria-labelledby="writing-title">
            <span className="margin-note left" aria-hidden="true">
              essays &amp; notes ⤹
            </span>
            <div className="section-heading">
              <p>03</p>
              <h2 id="writing-title">Writing</h2>
              <span className="section-note">essays &amp; technical notes</span>
            </div>
            <div className="writing-home-grid">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="writing-home-card">
                  <Link href={`/writing/${post.slug}`} className="writing-home-card-link">
                    {post.coverImage && (
                      <div className="writing-home-cover-wrap">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={600}
                          height={340}
                          priority
                          className="writing-home-cover-img"
                        />
                      </div>
                    )}
                    <div className="writing-home-card-body">
                      <div className="writing-home-meta">
                        <time>{post.date}</time>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="writing-home-card-title">{post.title}</h3>
                      {post.summary && (
                        <p className="writing-home-card-summary">{post.summary}</p>
                      )}
                      <div className="writing-home-card-footer">
                        <div className="tags">
                          {post.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <span className="writing-home-read-more">
                          <span>Read</span>
                          <MoveRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="writing-home-actions">
              <Link href="/writing" className="action-btn writing-view-all-btn">
                <span>View All Writing ({allPosts.length})</span>
                <MoveRight size={13} />
              </Link>
            </div>
          </section>

          {/* Section 04: Activity / GitHub Heatmap (Chánh Đại style) */}
          <section className="section" id="activity" aria-labelledby="activity-title">
            <span className="margin-note left" aria-hidden="true">
              commit streak ⤹
            </span>
            <div className="section-heading">
              <p>04</p>
              <h2 id="activity-title">Activity</h2>
              <span className="section-note">github heatmap</span>
            </div>
            <GitHubContributions />
          </section>

          {/* Section 05: Experience */}
          <section className="section" id="experience" aria-labelledby="experience-title">
            <span className="margin-note left" aria-hidden="true">
              roles & journey ⤹
            </span>
            <div className="section-heading">
              <p>05</p>
              <h2 id="experience-title">Experience</h2>
              <span className="section-note flex items-center gap-2">
                <span>roles &amp; engineering</span>
                <PiixpalCreature />
              </span>
            </div>
            <ExperienceList experiences={experiences} />
          </section>

          {/* Section 06: Tech Stack (Chánh Đại / Animesh style with category filters & hover brand colors) */}
          <section className="section" id="stack" aria-labelledby="stack-title">
            <div className="section-heading">
              <p>06</p>
              <h2 id="stack-title">Tech Stack</h2>
              <span className="section-note">select category to filter</span>
            </div>
            <TechStack />
          </section>

          {/* Section 07: Contact */}
          <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <span className="margin-note left" aria-hidden="true">
              say hello ⤹
            </span>
            <div className="section-heading">
              <p>07</p>
              <h2 id="contact-title">Contact</h2>
              <span className="section-note">get in touch</span>
            </div>
            <p>
              Have a product idea, a technical problem, or a role where thoughtful ownership matters?
              I&apos;d be glad to hear from you.
            </p>
            <div className="contact-methods">
              <a className="contact-email" href="mailto:hello@itsadee.com">
                hello@itsadee.com <MoveRight size={18} />
              </a>
              <a
                className="contact-cal-btn"
                href="https://cal.com/adeeshaikh/30min"
                target="_blank"
                rel="noreferrer"
              >
                <Calendar size={14} />
                <span>Schedule a call</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="footer-socials">
              {socials.slice(1).map((social) => (
                <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
                  {social.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </section>
        </div>
        <footer>
          <div className="footer-left">
            <span className="footer-wordmark">itsadee.com</span>
            <span className="footer-dot">·</span>
            <span className="footer-copy">© {new Date().getFullYear()} Adee Shaikh</span>
          </div>
          <a href="#top" className="footer-top-link">
            <span>Back to top ↑</span>
          </a>
        </footer>
        <PageIndex />
      </div>
    </main>
  );
}
