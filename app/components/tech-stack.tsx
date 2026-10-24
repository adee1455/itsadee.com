"use client";

import { useState } from "react";
import { techSkills } from "../data/tech-skills";

const categories = [
  { id: "all", label: "All" },
  { id: "languages", label: "Languages" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database & Cloud" },
  { id: "web3", label: "Web3 & Tools" },
] as const;

export function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredItems =
    activeTab === "all"
      ? techSkills
      : techSkills.filter((item) => item.category === activeTab);

  return (
    <div className="tech-stack-container">
      {/* Category Tabs */}
      <div className="tech-tabs" role="tablist">
        {categories.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tech-tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tech Pills Grid */}
      <div className="tech-grid">
        {filteredItems.map((tech) => {
          const isHovered = hoveredTech === tech.name;
          return (
            <div
              key={tech.name}
              className={`tech-pill ${isHovered ? "hovered" : ""}`}
              style={
                {
                  "--brand-color": tech.color,
                } as React.CSSProperties
              }
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <span className="tech-icon" style={{ color: isHovered ? tech.color : undefined }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d={tech.path} />
                </svg>
              </span>
              <span className="tech-name">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
