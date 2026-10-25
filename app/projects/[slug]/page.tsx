import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Globe } from "lucide-react";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { Header } from "../../components/header";
import { Mascot } from "../../components/mascot";

function GithubIcon({ size = 14 }: { size?: number }) {
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

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const caseStudies = getAllCaseStudies();
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };

  const projectUrl = `https://itsadee.com/projects/${study.slug}`;
  const imageUrl = study.cover || "/opengraph-image";
  const displayTitle = study.title.toLowerCase().includes(study.project.toLowerCase())
    ? study.title
    : `${study.project}: ${study.title}`;

  return {
    title: `${displayTitle} (Case Study)`,
    description:
      study.summary || `Deep-dive case study of ${study.project} by Adee Shaikh`,
    alternates: {
      canonical: `/projects/${study.slug}`,
    },
    keywords: [
      study.project,
      ...(study.stack || []),
      "Case Study",
      "Software Architecture",
      "Adee Shaikh",
    ],
    openGraph: {
      type: "article",
      title: `${displayTitle} | Adee Shaikh`,
      description:
        study.summary || `Deep-dive case study of ${study.project} by Adee Shaikh`,
      url: projectUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${study.project} Case Study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayTitle} | Adee Shaikh`,
      description:
        study.summary || `Deep-dive case study of ${study.project} by Adee Shaikh`,
      site: "@hey_itsadee",
      creator: "@hey_itsadee",
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${study.project}: ${study.title}`,
    description: study.summary,
    image: study.cover ? `https://itsadee.com${study.cover}` : undefined,
    author: {
      "@type": "Person",
      name: "Adee Shaikh",
      url: "https://itsadee.com",
    },
    publisher: {
      "@type": "Person",
      name: "Adee Shaikh",
      url: "https://itsadee.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://itsadee.com/projects/${study.slug}`,
    },
    keywords: [study.project, ...(study.stack || [])].join(", "),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Mascot />
      <div className="shell">
        <Header />
        <div className="content">
          <article className="case-study-container">
            <div className="inner-page-header">
              <Link href="/#work" className="back-link">
                <ArrowLeft size={14} />
                <span>Back to Featured Work</span>
              </Link>
            </div>

            <header className="case-study-hero">
              <div className="case-study-meta-badge">
                <span>CASE STUDY</span>
                <span>·</span>
                <span>{study.year}</span>
              </div>

              <h1 className="case-study-title">{study.title}</h1>

              {study.summary && (
                <p className="case-study-lead">{study.summary}</p>
              )}

              {/* Project Specs Card */}
              <div className="case-study-specs">
                <div className="spec-item">
                  <span className="spec-label">Role</span>
                  <span className="spec-value">{study.role}</span>
                </div>
                {study.timeline && (
                  <div className="spec-item">
                    <span className="spec-label">Timeline</span>
                    <span className="spec-value">{study.timeline}</span>
                  </div>
                )}
                <div className="spec-item spec-stack">
                  <span className="spec-label">Stack</span>
                  <div className="spec-tags">
                    {study.stack.map((t) => (
                      <span key={t} className="tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {(study.website || study.github) && (
                  <div className="spec-item spec-links">
                    <span className="spec-label">Links</span>
                    <div className="spec-link-buttons">
                      {study.website && (
                        <a
                          href={study.website}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                        >
                          <Globe size={13} />
                          <span>Live Product</span>
                        </a>
                      )}
                      {study.github && (
                        <a
                          href={study.github}
                          target="_blank"
                          rel="noreferrer"
                          className="project-link-btn"
                        >
                          <GithubIcon size={13} />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {study.coverImage && (
                <div className="case-study-cover-wrap">
                  <Image
                    src={study.coverImage}
                    alt={`${study.project} interface overview`}
                    width={1000}
                    height={560}
                    priority
                    className="case-study-cover-img"
                  />
                </div>
              )}
            </header>

            <div className="article-divider" />

            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: study.contentHtml }}
            />

            <footer className="inner-page-footer">
              <Link href="/#work" className="back-link">
                <ArrowLeft size={14} />
                <span>Back to Featured Work</span>
              </Link>
              <Link href="/writing" className="back-link">
                <span>Read Essays & Notes →</span>
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
