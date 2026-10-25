#!/usr/bin/env node

import fs from "fs";
import path from "path";

const type = process.argv[2]; // "post" or "case-study"
const title = process.argv[3];

if (!type || !title) {
  console.log('Usage:');
  console.log('  npm run new:post "Title of your post"');
  console.log('  npm run new:case-study "Project Name"');
  process.exit(1);
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slug = slugify(title);
const today = new Date().toISOString().split('T')[0];

if (type === 'post') {
  const dir = path.join(process.cwd(), 'content', 'writing');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`Post already exists at: ${filePath}`);
    process.exit(1);
  }

  const template = `---
title: "${title}"
date: "${today}"
summary: "Short one or two sentence summary of the post."
tags: ["Product", "Engineering"]
published: true
---

Write your article here using Markdown.

## Heading

Your thoughts here...
`;

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`✓ Created new post at: content/writing/${slug}.md`);
  console.log(`  Preview url: /writing/${slug}`);
} else if (type === 'case-study') {
  const dir = path.join(process.cwd(), 'content', 'projects');
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`Case study already exists at: ${filePath}`);
    process.exit(1);
  }

  const template = `---
project: "${title}"
title: "${title}: Reimagining the experience"
summary: "A short synopsis of what was built and why it matters."
year: "${new Date().getFullYear()}"
role: "Product Engineer"
timeline: "2025 – Present"
stack: ["TypeScript", "React", "Tailwind CSS"]
website: "https://${slug}.itsadee.com"
github: "https://github.com/adee1455/${slug}"
coverImage: "/projects/${slug}-cover.png"
---

## Overview

Describe the problem space and motivation...

## The Solution

Walk through the design and engineering...

## Technical Highlights

Key decisions and architecture...
`;

  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`✓ Created new case study at: content/projects/${slug}.md`);
  console.log(`  Preview url: /projects/${slug}`);
} else {
  console.error(`Unknown type: ${type}. Use "post" or "case-study".`);
  process.exit(1);
}
