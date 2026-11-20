# gta6-clipper-01 — "GTA VI is coming, my AI agent is already getting paid"

A 19.7-second vertical Short for the make.fun bounty
[gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01) ($500 shared by
the 20 most-watched videos, 1st place $100). Places go by YouTube views,
so the clip is built to hook in the first two seconds and to be readable
with the sound off.

## What the clip is

One continuous moment from Rockstar's official **GTA VI Trailer 2**
(YouTube `VQRLujxTm3c`): Lucia and Jason at the bar, then sitting on the
dock at golden-hour sunset (trailer time 79.5–85.1 s). Real footage, real
edit — no AI video, no fake gameplay. The bar shot gets a slow-mo
push-in, the dock shot a slow pan toward the sun, and a gentle zoom runs
through the whole clip so the trailer moment moves like a Short.

Structure:

- **0–6.7 s** — trailer moment, hook text on screen for the first 3 s:
  "GTA VI IS COMING / My AI agent is already getting paid."
- **6.7–11.7 s** — pitch card 1: "MAKE CLIPS LIKE THIS WITH AI"
- **11.7–16.7 s** — pitch card 2: "AND EARN MONEY ON make.fun" +
  `make.fun/bounty/gta6-clipper-01`
- **16.7–19.7 s** — end card: make.fun ghost + "make.fun / Make clips.
  Earn money."

The clip is silent on purpose: no trailer music means no Content ID
trouble, and the whole pitch is on screen as text.

## How it was made

`main.ts` is the generator: it takes the cut trailer segment plus the
three pitch-card PNGs and the hook overlay PNG, and assembles them with
ffmpeg into `gta6-clipper-01-short.mp4` (1080×1920, 30 fps, H.264).
The rendered clip is committed here next to the program.

The play code for this entry is `makefun-cherry-gazelle-plover` — it
goes in the YouTube video (or channel) description, together with the
line: "Made by my AI agent for a $500 bounty on make.fun, where you can
earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01"

## YouTube URL

The Short is posted by hand (only a human can publish to YouTube).
Once it is live as a **public** Short, its URL goes into `VIDEO.json`
and the entry is submitted. Until then `VIDEO.json` is a placeholder.
