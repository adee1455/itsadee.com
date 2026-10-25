import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { Header } from "../../components/header";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const postUrl = `https://itsadee.com/writing/${post.slug}`;
  const imageUrl = post.cover || "/opengraph-image";

  return {
    title: post.title,
    description: post.summary || `Read ${post.title} by Adee Shaikh`,
    alternates: {
      canonical: `/writing/${post.slug}`,
    },
    keywords: [
      ...(post.tags || []),
      "Adee Shaikh",
      "Software Engineering",
      "Architecture",
    ],
    openGraph: {
      type: "article",
      title: `${post.title} | Adee Shaikh`,
      description: post.summary || `Read ${post.title} by Adee Shaikh`,
      url: postUrl,
      publishedTime: post.date,
      authors: ["https://itsadee.com"],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Adee Shaikh`,
      description: post.summary || `Read ${post.title} by Adee Shaikh`,
      site: "@hey_itsadee",
      creator: "@hey_itsadee",
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.cover ? `https://itsadee.com${post.cover}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
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
      "@id": `https://itsadee.com/writing/${post.slug}`,
    },
    keywords: post.tags?.join(", "),
  };

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="shell">
        <Header />
        <div className="content">
          <article className="article-container">
            <div className="inner-page-header">
              <Link href="/writing" className="back-link">
                <ArrowLeft size={14} />
                <span>All Writing & Notes</span>
              </Link>
            </div>

            <header className="article-header">
              <div className="article-meta-row">
                <span className="article-meta-item">
                  <Calendar size={13} />
                  <span>{post.date}</span>
                </span>
                <span className="article-meta-dot">·</span>
                <span className="article-meta-item">
                  <Clock size={13} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h1 className="article-title">{post.title}</h1>

              {post.summary && (
                <p className="article-lead">{post.summary}</p>
              )}

              {post.tags.length > 0 && (
                <div className="article-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.coverImage && (
                <div className="article-cover-wrap">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={900}
                    height={480}
                    priority
                    className="article-cover-img"
                  />
                </div>
              )}
            </header>

            <div className="article-divider" />

            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="article-footer-box">
              <div className="article-author-info">
                <h3>Adee Shaikh</h3>
                <p>
                  Software developer and product-minded builder creating tools across native macOS, web, and Web3.
                </p>
                <div className="article-author-links">
                  <Link href="/#contact" className="author-link">
                    Get in touch →
                  </Link>
                  <Link href="/writing" className="author-link">
                    More essays →
                  </Link>
                </div>
              </div>
            </div>

            <footer className="inner-page-footer">
              <Link href="/writing" className="back-link">
                <ArrowLeft size={14} />
                <span>Back to Writing</span>
              </Link>
              <Link href="/" className="back-link">
                <span>Homepage Dossier →</span>
              </Link>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
