"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Play, BookOpen } from "lucide-react";
import { Project } from "../data/portfolio";

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

export function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!project.video || !videoRef.current) return;

    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered, project.video]);

  return (
    <article
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Preview Banner */}
      {project.preview ? (
        <div className="project-preview-wrap">
          <Image
            src={project.preview}
            alt={`${project.title} interface preview`}
            width={720}
            height={450}
            className="project-preview-img"
            priority={project.title === "Fettle"}
          />
          {project.hoverPreview && (
            <Image
              src={project.hoverPreview}
              alt={`${project.title} dashboard on hover`}
              width={720}
              height={450}
              className={`project-preview-hover-img ${isHovered ? "active" : ""}`}
            />
          )}
          {project.video && (
            <>
              <video
                ref={videoRef}
                src={project.video}
                muted
                playsInline
                loop
                preload="metadata"
                className={`project-preview-video ${isHovered ? "playing" : ""}`}
              />
              <div
                className={`project-video-badge-icon ${isHovered ? "playing" : ""}`}
                aria-hidden="true"
                title="Video preview on hover"
              >
                <Play size={10} fill="currentColor" className="project-play-icon" />
              </div>
            </>
          )}
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
          {project.caseStudySlug && (
            <Link
              href={`/projects/${project.caseStudySlug}`}
              className="project-link-btn project-casestudy-btn"
              title={`Read ${project.title} Case Study`}
            >
              <BookOpen size={12} />
              <span>Case Study</span>
            </Link>
          )}
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
  );
}
