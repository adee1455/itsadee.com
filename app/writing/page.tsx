import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/content";
import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "Writing & Notes",
  description:
    "Technical essays, security analyses, and engineering notes on modern architecture, AI inference economics, and native software craft by Adee Shaikh.",
  alternates: {
    canonical: "/writing",
  },
  openGraph: {
    title: "Writing & Notes | Adee Shaikh",
    description:
      "Technical essays, security analyses, and engineering notes on modern architecture, AI inference economics, and native software craft by Adee Shaikh.",
    url: "https://itsadee.com/writing",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Writing & Notes | Adee Shaikh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Notes | Adee Shaikh",
    description:
      "Technical essays, security analyses, and engineering notes on modern architecture, AI inference economics, and native software craft by Adee Shaikh.",
    images: ["/opengraph-image"],
  },
};

export default function WritingIndexPage() {
  const posts = getAllPosts();

  return (
    <main id="top">
      <div className="shell">
        <Header />
        <div className="content">
          <div className="inner-page-header">
            <Link href="/" className="back-link">
              <ArrowLeft size={14} />
              <span>Back to Dossier</span>
            </Link>
            <div className="inner-page-title-row">
              <div className="inner-page-meta">ARCHIVE / ESSAYS & NOTES</div>
              <h1 className="inner-page-title">Writing & Notes</h1>
              <p className="inner-page-subtitle">
                Thoughts on software craftsmanship, product engineering, interface design, and 0→1 building.
              </p>
            </div>
          </div>

          <section className="writing-list-section">
            <div className="writing-list">
              {posts.map((post) => (
                <article key={post.slug} className="writing-card">
                  <Link href={`/writing/${post.slug}`} className="writing-card-link">
                    <div className="writing-card-inner">
                      <div className="writing-card-content">
                        <div className="writing-card-top">
                          <time className="writing-card-date">{post.date}</time>
                          <span className="writing-card-readtime">{post.readTime}</span>
                        </div>
                        <div className="writing-card-title-row">
                          <h2 className="writing-card-title">{post.title}</h2>
                          <ArrowUpRight size={18} className="writing-card-arrow" />
                        </div>
                        {post.summary && (
                          <p className="writing-card-summary">{post.summary}</p>
                        )}
                        {post.tags.length > 0 && (
                          <div className="writing-card-tags">
                            {post.tags.map((tag) => (
                              <span key={tag} className="tag-pill">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      {post.coverImage && (
                        <div className="writing-card-thumb-wrap">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={240}
                            height={140}
                            className="writing-card-thumb"
                          />
                        </div>
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <footer className="inner-page-footer">
            <Link href="/" className="back-link">
              <ArrowLeft size={14} />
              <span>Back to main portfolio</span>
            </Link>
            <span className="footer-copyright">
              © {new Date().getFullYear()} Adee Shaikh
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}
