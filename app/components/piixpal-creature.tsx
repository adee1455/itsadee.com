"use client";

import { useEffect, useRef, useState } from "react";

const PALETTE: Record<string, string> = {
  k: "#1b1226",
  c: "#ff6b4a",
  H: "#ffd4c4",
  d: "#cf3f22",
  p: "#ffb3a0",
  w: "#ffffff",
};

const BASE = [
  ".....kkkk.....",
  "...kkcccckk...",
  "..kcHHccccck..",
  ".kcHHccccccck.",
  ".kcHcccccccck.",
  "kcccccccccccck",
  "kcccccccccccck",
  "kcpcccccccccpk",
  "kdccccccccccdk",
  "kddccccccccddk",
  ".kddddddddddk.",
  "..kkkkkkkkkk..",
];

const EYES = {
  open: ["wk", "kk"],
  blink: ["cc", "kk"],
  happy: ["kk", "cc"],
  up: ["kk", "wk"],
};

const MOUTHS = {
  smile: ["k__k", "_kk_"],
  open: ["_kk_", "_kk_"],
};

function composeFrame(eyeKey: keyof typeof EYES, mouthKey: keyof typeof MOUTHS): string[] {
  const eye = EYES[eyeKey];
  const mouth = MOUTHS[mouthKey];
  const grid = BASE.map((row) => row.split(""));
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      grid[5 + r][4 + c] = eye[r][c];
      grid[5 + r][8 + c] = eye[r][c];
    }
  }
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const char = mouth[r][c];
      if (char !== "_") grid[7 + r][5 + c] = char;
    }
  }
  return grid.map((r) => r.join(""));
}

const FRAMES: Record<string, string[]> = {
  idle: composeFrame("open", "smile"),
  blink: composeFrame("blink", "smile"),
  happy: composeFrame("happy", "smile"),
  jump: composeFrame("up", "open"),
};

export function PiixpalCreature() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();

    // Physics & movement state
    let posX = 0; // -18 to +18
    let targetX = 14;
    let posY = 0; // 0 is ground, negative is in air
    let velY = 0;
    let facing = 1; // 1 = right, -1 = left
    let squashX = 1.0;
    let squashY = 1.0;

    let mode: "walk" | "idle" | "jump" = "idle";
    let modeTimer = 1.5;
    let blinkTimer = 2.5;
    let currentFrame = "idle";
    let isHovered = false;

    const drawFrame = (frameKey: string) => {
      const rows = FRAMES[frameKey] || FRAMES.idle;
      ctx.clearRect(0, 0, 14, 12);
      for (let y = 0; y < 12; y++) {
        for (let x = 0; x < 14; x++) {
          const char = rows[y][x];
          if (char !== ".") {
            ctx.fillStyle = PALETTE[char] || "#ff6b4a";
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    drawFrame("idle");

    const onEnter = () => {
      isHovered = true;
      mode = "idle";
      currentFrame = "happy";
      // Cheerful mini jump on hover
      if (posY === 0) {
        velY = -3.2;
        mode = "jump";
      }
    };

    const onLeave = () => {
      isHovered = false;
      currentFrame = "idle";
    };

    const cEl = containerRef.current;
    if (cEl) {
      cEl.addEventListener("mouseenter", onEnter);
      cEl.addEventListener("mouseleave", onLeave);
    }

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Blinking logic when on ground
      if (posY === 0 && !isHovered) {
        blinkTimer -= dt;
        if (blinkTimer <= 0) {
          currentFrame = "blink";
          if (blinkTimer <= -0.15) {
            currentFrame = "idle";
            blinkTimer = 2.2 + Math.random() * 2.5;
          }
        } else {
          currentFrame = "idle";
        }
      } else if (isHovered) {
        currentFrame = "happy";
      }

      // Vertical jump physics
      if (mode === "jump" || posY < 0) {
        currentFrame = "jump";
        velY += 12 * dt; // gentle gravity
        posY += velY * 30 * dt;

        if (posY >= 0) {
          // Landing! Soft bouncy cushion (NEVER flat)
          posY = 0;
          velY = 0;
          mode = "idle";
          modeTimer = 0.8 + Math.random() * 1.2;
          squashX = 1.14;
          squashY = 0.88;
        }
      }

      // Spring recovery from cushion
      squashX += (1.0 - squashX) * 10 * dt;
      squashY += (1.0 - squashY) * 10 * dt;

      // Horizontal patrol logic (wanders left & right)
      if (!isHovered && posY === 0) {
        modeTimer -= dt;

        if (mode === "walk") {
          const dx = targetX - posX;
          if (Math.abs(dx) > 0.5) {
            facing = dx > 0 ? 1 : -1;
            posX += facing * 12 * dt; // gentle walking pace
            // Tiny walking waddle
            squashY = 1.0 + Math.sin(now * 0.015) * 0.05;
          } else {
            // Reached destination, pause and rest
            mode = "idle";
            modeTimer = 1.2 + Math.random() * 1.8;
          }
        } else if (mode === "idle" && modeTimer <= 0) {
          // Decide whether to walk or do a cute hop
          const pickJump = Math.random() > 0.45;
          if (pickJump) {
            // Do a little hop!
            mode = "jump";
            velY = -2.8 - Math.random() * 1.2; // cute small hop (6-10px)
            // Pick next target location
            targetX = (Math.random() * 32 - 16);
            facing = targetX > posX ? 1 : -1;
          } else {
            // Walk to a new point
            mode = "walk";
            targetX = (Math.random() * 32 - 16);
            modeTimer = 3.0;
          }
        }
      }

      // Draw current frame
      drawFrame(currentFrame);

      // Apply transforms
      if (canvas) {
        canvas.style.transform = `translate3d(${posX}px, ${posY}px, 0) scaleX(${facing}) scale(${squashX}, ${squashY})`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      if (cEl) {
        cEl.removeEventListener("mouseenter", onEnter);
        cEl.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  const handleClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1200);
  };

  return (
    <div
      ref={containerRef}
      className="piixpal-patrol-track"
      onClick={handleClick}
      title="Boing! (wanders & hops)"
      aria-label="Interactive pixel Boing creature"
    >
      {showHeart && <span className="boing-heart">♥</span>}
      <canvas
        ref={canvasRef}
        width={14}
        height={12}
        className="boing-pixel-canvas"
      />
    </div>
  );
}
