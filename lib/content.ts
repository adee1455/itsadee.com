import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDirectory = path.join(process.cwd(), "content");
const writingDirectory = path.join(contentDirectory, "writing");
const projectsDirectory = path.join(contentDirectory, "projects");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
  coverImage?: string;
  cover?: string;
  published?: boolean;
};

export type Post = PostMeta & {
  contentHtml: string;
};

export type CaseStudyMeta = {
  slug: string;
  project: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  timeline?: string;
  stack: string[];
  website?: string;
  github?: string;
  coverImage?: string;
  cover?: string;
};

export type CaseStudy = CaseStudyMeta & {
  contentHtml: string;
};

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false,
});

/* =========================================================================
   WRITING / BLOG
   ========================================================================= */

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(writingDirectory)) return [];

  const fileNames = fs.readdirSync(writingDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(writingDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const coverUrl = data.cover || data.coverImage || "";

      return {
        slug,
        title: data.title || slug,
        date: data.date ? String(data.date) : "2026-10-25",
        summary: data.summary || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        readTime: calculateReadTime(content),
        coverImage: coverUrl,
        cover: coverUrl,
        published: data.published !== false,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const possiblePaths = [
    path.join(writingDirectory, `${slug}.md`),
    path.join(writingDirectory, `${slug}.mdx`),
  ];

  let fullPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      fullPath = p;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked.parse(content) as string;
  const coverUrl = data.cover || data.coverImage || "";

  return {
    slug,
    title: data.title || slug,
    date: data.date ? String(data.date) : "2026-10-25",
    summary: data.summary || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: calculateReadTime(content),
    coverImage: coverUrl,
    cover: coverUrl,
    contentHtml,
  };
}

/* =========================================================================
   PROJECT CASE STUDIES
   ========================================================================= */

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const coverUrl = data.cover || data.coverImage || "";

      return {
        slug,
        project: data.project || data.title || slug,
        title: data.title || slug,
        summary: data.summary || "",
        year: data.year || "2025",
        role: data.role || "Product Engineer",
        timeline: data.timeline || "",
        stack: Array.isArray(data.stack) ? data.stack : [],
        website: data.website || "",
        github: data.github || "",
        coverImage: coverUrl,
        cover: coverUrl,
      };
    });
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const possiblePaths = [
    path.join(projectsDirectory, `${slug}.md`),
    path.join(projectsDirectory, `${slug}.mdx`),
  ];

  let fullPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      fullPath = p;
      break;
    }
  }

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked.parse(content) as string;

  const coverUrl = data.cover || data.coverImage || "";

  return {
    slug,
    project: data.project || data.title || slug,
    title: data.title || slug,
    summary: data.summary || "",
    year: data.year || "2025",
    role: data.role || "Product Engineer",
    timeline: data.timeline || "",
    stack: Array.isArray(data.stack) ? data.stack : [],
    website: data.website || "",
    github: data.github || "",
    coverImage: coverUrl,
    cover: coverUrl,
    contentHtml,
  };
}

export function hasCaseStudy(slug: string): boolean {
  return (
    fs.existsSync(path.join(projectsDirectory, `${slug}.md`)) ||
    fs.existsSync(path.join(projectsDirectory, `${slug}.mdx`))
  );
}
