import Image from "next/image";
import { ArrowUpRight, MapPin, Mail, MoveRight, Globe, Calendar } from "lucide-react";

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
import { experiences, moreWork, projects, socials } from "./data/portfolio";

export default function Home() {
  return (
    <main id="top">
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
                  src="/adee-avatar.png"
                  width={160}
                  height={160}
                  priority
                  alt="Illustrated portrait of Adee Shaikh"
                />
              </div>
              <div className="identity-copy">
                <h1 id="hero-title">Adee Shaikh</h1>
                <p className="role">
                  Software Developer <span>·</span> Product-minded builder
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
              <ul className="about-bullets">
                <li>
                  I&apos;m Adee Shaikh, a product-focused software developer who enjoys turning ideas into useful, thoughtfully crafted products.
                </li>
                <li>
                  I build software across different platforms, explore AI-powered solutions, and combine engineering with product thinking to take ideas from concept to launch.
                </li>
                <li>
                  I&apos;m fascinated by the intersection of technology, user experience, and business, and how the right ideas can become products that solve real problems.
                </li>
              </ul>
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
                <article className="project-card" key={project.title}>
                  {/* Top Preview Banner */}
                  {project.preview ? (
                    <div className="project-preview-wrap">
                      <Image
                        src={project.preview}
                        alt={`${project.title} interface preview`}
                        width={720}
                        height={450}
                        className="project-preview-img"
                      />
                    </div>
                  ) : (
                    <div className="project-preview-wrap project-preview-empty">
                      <div className="project-placeholder-content">
                        <span className="project-placeholder-badge">In Development</span>
                        <span className="project-placeholder-sub">Preview coming soon · PWA</span>
                      </div>
                    </div>
                  )}

                  <div className="project-card-body">
                    <div className="project-title-row">
                      <div className="project-title-left">
                        <span className="project-number-badge">{project.number}</span>
                        <h3>{project.title}</h3>
                      </div>
                      <span className="project-meta-pill">
                        {project.meta.split(" · ")[1] || project.meta}
                      </span>
                    </div>
                    <p className="project-desc">{project.description}</p>
                  </div>

                  <div className="project-card-footer">
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.links.map((link) => {
                        const isGithub = link.label.toLowerCase().includes("github");
                        return (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            key={link.label}
                            className="project-link-btn"
                            title={`${project.title} ${link.label}`}
                            aria-label={`${project.title} ${link.label}`}
                          >
                            {isGithub ? <GithubIcon size={13} /> : <Globe size={13} />}
                            <span>{link.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </article>
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

          {/* Section 03: Activity / GitHub Heatmap (Chánh Đại style) */}
          <section className="section" id="activity" aria-labelledby="activity-title">
            <span className="margin-note left" aria-hidden="true">
              commit streak ⤹
            </span>
            <div className="section-heading">
              <p>03</p>
              <h2 id="activity-title">Activity</h2>
              <span className="section-note">github heatmap</span>
            </div>
            <GitHubContributions />
          </section>

          {/* Section 04: Experience */}
          <section className="section" id="experience" aria-labelledby="experience-title">
            <span className="margin-note left" aria-hidden="true">
              roles & journey ⤹
            </span>
            <div className="section-heading">
              <p>04</p>
              <h2 id="experience-title">Experience</h2>
              <span className="section-note flex items-center gap-2">
                <span>roles &amp; engineering</span>
                <PiixpalCreature />
              </span>
            </div>
            <ExperienceList experiences={experiences} />
          </section>

          {/* Section 05: Tech Stack (Chánh Đại / Animesh style with category filters & hover brand colors) */}
          <section className="section" id="stack" aria-labelledby="stack-title">
            <div className="section-heading">
              <p>05</p>
              <h2 id="stack-title">Tech Stack</h2>
              <span className="section-note">select category to filter</span>
            </div>
            <TechStack />
          </section>

          {/* Section 06: Contact */}
          <section className="section contact-section" id="contact" aria-labelledby="contact-title">
            <span className="margin-note left" aria-hidden="true">
              say hello ⤹
            </span>
            <div className="section-heading">
              <p>06</p>
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
