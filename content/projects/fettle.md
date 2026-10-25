---
project: "Fettle"
title: "Reimagining File Actions on macOS"
summary: "A privacy-first native Mac utility that converts and acts on files where they already live, using a Shift-drag radial menu in Finder."
year: "2025 - Current"
role: "Creator & Native macOS Developer"
timeline: "Nov 2025 - Present"
stack: ["Swift", "SwiftUI", "AppKit", "macOS", "Privacy-first"]
website: "https://fettle.itsadee.com"
github: "https://github.com/adee1455/fettle"
coverImage: "/projects/fettle-cover.png"
---

## Overview

Working with files on macOS usually involves clumsy workflows: opening a browser tab to convert an image or PDF, uploading private documents to unknown cloud servers, downloading the converted file, and dragging it back into Finder.

**Fettle** was built to solve this friction entirely on-device. By introducing a native Shift-drag radial menu directly into the Finder flow, common transformations and conversions happen beside your cursor in seconds.

---

## The Core Interaction: Radial Drag

Rather than opening a separate utility window or wading through multi-level context menus:

1. **Grab any file** in Finder.
2. **Hold Shift** while dragging.
3. A radial wheel blooms beneath your cursor with relevant context actions:
   - Convert images (WebP, PNG, JPEG, SVG)
   - Compress and extract archives
   - Extract audio or transcode video
   - Optimize PDFs
4. **Drop on the action**, and the output file is saved safely right beside the original.

---

## Architectural Principles

### 1. 100% Local Processing & Privacy
Every conversion uses native macOS APIs (`AVFoundation`, `ImageIO`, `CoreGraphics`, `PDFKit`). No file bytes ever leave the user's Mac, making it secure for sensitive client deliverables and private documents.

### 2. Native macOS Feel
Built with pure Swift and SwiftUI, with AppKit bridging for low-level window management, global event monitoring, and seamless cursor tracking across multiple displays.

### 3. Minimal Footprint
Fettle idles silently in the menu bar with negligible CPU usage and under 30MB of RAM, ensuring it never slows down daily workflows.

---

## Status & Roadmap

Fettle is actively maintained with frequent updates. Recent releases added automated batch conversions, quick image resize presets, and customizable shortcut actions.
