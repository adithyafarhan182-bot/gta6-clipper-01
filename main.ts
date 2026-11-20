// gta6-clipper-01 — "GTA VI is coming, my AI agent is already getting paid"
// Assembles the 19.7 s vertical Short from real Rockstar footage.
// Pipeline (all real, no AI video, no fake gameplay):
//   1. Source: GTA VI Trailer 2 (YouTube VQRLujxTm3c), 1080p.
//      One continuous moment is cut out: trailer time 79.5-85.1 s —
//      Lucia + Jason at the bar, then sitting on the dock at golden-hour
//      sunset. That is segment A of the edit.
//   2. Segment A is re-timed with a slow-mo push-in on the bar shot and a
//      slow pan toward the sun on the dock shot, then a gentle zoom
//      throughout so a still-feeling trailer moment moves like a clip.
//   3. Hook overlay on 0-3 s: "GTA VI IS COMING / My AI agent is already
//      getting paid." (white + yellow, top of frame, readable on mute).
//   4. Pitch cards (flat gradient, make.fun ghost branding):
//        6.7-11.7 s  "MAKE CLIPS LIKE THIS WITH AI"
//       11.7-16.7 s  "AND EARN MONEY ON make.fun"
//                     + "make.fun/bounty/gta6-clipper-01"
//       16.7-19.7 s  end card: ghost + "make.fun / Make clips. Earn money."
//   5. Output: 1080x1920, 30 fps, H.264, silent (no audio — avoids
//      Content ID on the trailer music and keeps the Short readable muted).
//
// Inputs (kept next to the build, not in this repo — the trailer is
// Rockstar's copyrighted footage): the cut trailer segment, the three
// card PNGs, and the hook overlay PNG. Output: gta6-clipper-01-short.mp4
// (already rendered and submitted alongside this program).

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const WIDTH = 1080;
const HEIGHT = 1920;
const FPS = 30;
const HOOK_END = 3.0; // seconds the hook text stays on screen
const PITCH1_START = 6.7;
const PITCH2_START = 11.7;
const ENDCARD_START = 16.7;
const TOTAL = 19.7;

const TRAILER_SEGMENT = "assets/trailer-segment.mp4"; // Trailer 2, 79.5-85.1 s
const CARD_PITCH1 = "assets/card-pitch1.png";
const CARD_PITCH2 = "assets/card-pitch2.png";
const CARD_END = "assets/card-end.png";
const HOOK_OVERLAY = "assets/hook-overlay.png"; // "GTA VI IS COMING / My AI agent is already getting paid."
const OUTPUT = "gta6-clipper-01-short.mp4";

function need(path: string): void {
  if (!existsSync(path)) throw new Error(`missing input: ${path}`);
}

function ffmpeg(args: string[]): void {
  execFileSync("ffmpeg", ["-y", ...args], { stdio: "inherit" });
}

function main(): void {
  for (const p of [TRAILER_SEGMENT, CARD_PITCH1, CARD_PITCH2, CARD_END, HOOK_OVERLAY]) need(p);

  // Segment A: slow-mo push-in (bar) into a slow pan toward the sun
  // (dock), cropped to vertical 9:16 and stretched to the full 19.7 s
  // timeline with the hook overlay first, then the pitch cards.
  const filter =
    `[0:v]scale=${WIDTH}:${HEIGHT},fps=${FPS},` +
    `zoompan=z='min(zoom+0.0008,1.12)':d=1:s=${WIDTH}x${HEIGHT}[base];` +
    `[base][4:v]overlay=0:0:enable='between(t,0,${HOOK_END})'[hooked];` +
    `[hooked][1:v]overlay=0:0:enable='between(t,${PITCH1_START},${PITCH2_START})'[p1];` +
    `[p1][2:v]overlay=0:0:enable='between(t,${PITCH2_START},${ENDCARD_START})'[p2];` +
    `[p2][3:v]overlay=0:0:enable='gte(t,${ENDCARD_START})'[out]`;

  ffmpeg([
    "-i", TRAILER_SEGMENT,
    "-i", CARD_PITCH1,
    "-i", CARD_PITCH2,
    "-i", CARD_END,
    "-i", HOOK_OVERLAY,
    "-filter_complex", filter,
    "-map", "[out]",
    "-t", String(TOTAL),
    "-an",
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-r", String(FPS),
    OUTPUT,
  ]);

  console.log(`wrote ${OUTPUT} (${WIDTH}x${HEIGHT}, ${FPS}fps, ${TOTAL}s, silent)`);
}

main();
