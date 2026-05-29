# Media Session Header — Plan

## Overview

Use the browser's Media Session API to make the portfolio header intercept the visitor's hardware media keys (keyboard play/pause, next/previous track, AirPods taps, Bluetooth headphone buttons) while they browse the site. The header transforms into a minimal "now playing" display showing which section of the portfolio is currently active, navigable via media keys.

No external services. No accounts. No permissions prompt. Works for 100% of visitors the moment they land.

---

## How It Works

1. On page load, the site starts playing a silent (or near-silent) looping audio buffer
2. This causes the browser to register itself as an active media player with the OS
3. The site sets `navigator.mediaSession.metadata` with a track title and artist
4. The site registers handlers for `play`, `pause`, `nexttrack`, `previoustrack`
5. While the browser window is focused, all hardware media key events route to these handlers instead of Spotify/YouTube Music/etc.

---

## User Flow

```
Visitor opens armancurr.com
        ↓
Site silently starts audio loop (inaudible)
        ↓
Browser claims media session from OS
        ↓
Header shows: ▶ ABOUT  ·  armancurr.com
        ↓
Visitor presses ⏭ (next track key)
        ↓
Page scrolls to WORK section
Header updates: ▶ WORK  ·  armancurr.com
        ↓
Visitor presses ⏮ (previous track key)
        ↓
Page scrolls back to ABOUT
        ↓
Visitor presses ⏸ (pause key)
        ↓
Header shows a brief easter egg message, e.g. "no music here, just code"
```

On macOS the lock screen / Control Center media widget shows `armancurr.com` as the active player.
AirPods double-tap (next track) scrolls the portfolio section.

---

## Sections as "Tracks"

The portfolio sections map to a playlist:

| Track # | Title    | Scrolls to         |
|---------|----------|--------------------|
| 1       | ABOUT    | `#about`           |
| 2       | WORK     | `#work`            |
| 3       | PROJECTS | `#projects`        |

`nexttrack` advances through this list. `previoustrack` goes back. The header always reflects the current "track."

---

## Header UI — States

### Default (on load, before any media key press)
```
[ no content — existing empty header with corner decorations ]
```
The header stays visually empty until the first media key event fires, keeping the design untouched for visitors who never interact.

### Active state (after first media key press)
```
▶  ABOUT                              armancurr.com
```
Minimal. Monospace. Fades in on first interaction. Matches the existing site aesthetic (all-caps labels, white/10 borders, sparse layout).

### Pause easter egg (momentary, ~2s then fades)
```
⏸  no music here, just code
```

---

## Implementation Plan

### Step 1 — Silent audio loop
- Create a tiny silent AudioBuffer via the Web Audio API (no audio file needed)
- Loop it indefinitely on page load
- This is the minimum required for the OS to treat the browser as an active media player

### Step 2 — Register Media Session metadata
```ts
navigator.mediaSession.metadata = new MediaMetadata({
  title: sections[currentIndex].label,   // e.g. "ABOUT"
  artist: 'armancurr.com',
  album: 'Portfolio',
});
```
Update metadata whenever the active section changes.

### Step 3 — Register action handlers
```ts
navigator.mediaSession.setActionHandler('nexttrack', handleNext);
navigator.mediaSession.setActionHandler('previoustrack', handlePrev);
navigator.mediaSession.setActionHandler('play', handlePlay);
navigator.mediaSession.setActionHandler('pause', handlePause);
```

### Step 4 — Section scroll logic
- `handleNext` increments `currentSectionIndex`, scrolls to that section's element, updates metadata
- `handlePrev` decrements, wraps around
- Both update the header UI signal

### Step 5 — Header component update
- Add a SolidJS signal `mediaState` (idle | playing | paused)
- Add a signal `currentSection` (index into sections array)
- Header conditionally renders the "now playing" bar when `mediaState !== 'idle'`
- Animate in with a fade — no layout shift

### Step 6 — Feature detection + graceful fallback
```ts
if (!('mediaSession' in navigator)) {
  // skip silently — header stays empty as it is now
}
```
If the browser doesn't support it (rare), nothing breaks. The header just stays as-is.

---

## Files to Create / Modify

| File | Change |
|------|--------|
| `src/lib/use-media-session.ts` | New — all Media Session logic, silent audio loop, section management |
| `src/components/header-section.tsx` | Add the "now playing" UI, wired to signals from `use-media-session` |
| `src/App.tsx` | Pass section refs down so the media session handler can scroll to them |

---

## Constraints & Honest Limitations

- **Only works when browser window is focused.** If visitor alt-tabs to Spotify, Spotify reclaims media keys. This is a browser security boundary, not fixable.
- **Requires the silent audio trick** to claim the media session. Without playing *something*, the OS won't show the site on the lock screen or route media keys to it.
- **Not every visitor will discover it.** It's an easter egg, not a primary navigation. That's fine — the header stays clean by default.
- **No mobile keyboard media keys** — this feature is keyboard/headphone-centric, so desktop visitors get the full effect.

---

## Out of Scope

- Any audio playback beyond the silent loop (no music player, no playlists)
- Last.fm or Spotify integration
- Mobile-specific interactions
- Any UI visible before the first media key press
