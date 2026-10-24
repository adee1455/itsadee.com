"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Experience } from "../data/portfolio";

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="experience-list">
      {experiences.map((experience, index) => {
        const expanded = index === open;
        const panelId = `experience-${index}`;
        return (
          <article className="experience-row" key={experience.company}>
            <button
              className="experience-trigger"
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="experience-mark">{String(index + 1).padStart(2, "0")}</span>
              <span className="experience-title"><strong>{experience.role}</strong><span>{experience.company}</span></span>
              <span className="experience-period">{experience.period}</span>
              <ChevronDown className={expanded ? "chevron rotated" : "chevron"} size={17} aria-hidden="true" />
            </button>
            <div className={expanded ? "experience-details open" : "experience-details"} id={panelId}>
              <ul>{experience.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
