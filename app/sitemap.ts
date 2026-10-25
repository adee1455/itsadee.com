import type { MetadataRoute } from "next";
import { getAllPosts, getAllCaseStudies } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const caseStudies = getAllCaseStudies();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://itsadee.com/writing/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `https://itsadee.com/projects/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    {
      url: "https://itsadee.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://itsadee.com/writing",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...caseStudyEntries,
    ...postEntries,
  ];
}
