# Optional Media Session Header — Implementation Plan

## Corrected Scope

This feature does not control the visitor's Spotify, Apple Music, YouTube Music, or device-wide media playback. A website cannot read, pause, skip, or control media from other apps.

Instead, the site creates its own optional silent media session. When enabled, hardware media keys can be routed to the portfolio page and used as an easter egg navigation layer for portfolio sections.

## Product Behavior

- The feature is off by default.
- The feature can be enabled from `/tweaks`.
- When disabled, no silent audio starts, no Media Session handlers are registered, and the header stays visually empty.
- When enabled, the home page may start a silent browser media session and register media-key handlers.
- The header remains empty until the user first triggers the feature with a media-session action.
- After the user discovers it, the header stays visible while the feature remains enabled.
- The header only returns to empty when the feature is toggled off in `/tweaks`.
- `/tweaks` is the settings page for both the existing sound options and this feature.

## User Flow

```txt
Visitor opens /tweaks
        ↓
Visitor enables Media Session Header
        ↓
Preference is saved to localStorage
        ↓
Visitor returns to home page
        ↓
Site starts its own silent media session when possible
        ↓
Visitor presses a hardware media key
        ↓
Header appears as a now-playing display for the current portfolio section
        ↓
Next/previous media keys navigate between portfolio sections
        ↓
Header stays visible until the feature is disabled in /tweaks
```

## Tracks

The portfolio sections are represented as local site tracks:

| Track # | Title | Scroll target |
| --- | --- | --- |
| 1 | ABOUT | `#about` |
| 2 | WORK | `#work` |
| 3 | PROJECTS | `#projects` |

`nexttrack` moves forward through this list. `previoustrack` moves backward through this list.

Open decision: at the ends of the list, either loop like a playlist or clamp at the first/last section.

## Header UI

### Disabled Or Not Yet Discovered

```txt
[ no content — existing empty header with corner decorations ]
```

### Active State

Use Phosphor Solid icons, not ASCII characters.

```txt
[filled Play icon]  ABOUT                              armancurr.com
```

### Pause Easter Egg

```txt
[filled Pause icon]  no music here, just code
```

The pause easter egg is temporary. After roughly 2 seconds, return to the active now-playing state. Do not hide the header unless the feature is disabled.

## Implementation Plan

### Step 1 — Add Persistent Setting

- Add a `localStorage` key, for example `site:media-session-enabled`.
- Default to `false` when no value is saved.
- Store only explicit boolean-like values, such as `"true"` and `"false"`.
- Keep this setting separate from the existing sound preset storage.

### Step 2 — Extend `/tweaks`

- Keep the existing sound preset controls.
- Add a new settings block for Media Session Header.
- Add a toggle to enable or disable the feature.
- Include copy that accurately describes the feature:
  - It enables hardware media-key navigation for the portfolio.
  - It uses a silent browser media session while enabled.
  - It does not control external music apps.
- If Media Session API is unsupported, show a short unsupported note or disable the toggle.

### Step 3 — Create `src/lib/use-media-session.ts`

Responsibilities:

- Define the section track list.
- Feature-detect `navigator.mediaSession`.
- Start and stop the silent audio loop only when enabled.
- Register and unregister Media Session action handlers.
- Update Media Session metadata.
- Expose Solid signals for the header.

Suggested return shape:

```ts
type MediaSessionState = "idle" | "playing" | "paused";

type MediaSessionTrack = {
  id: "about" | "work" | "projects";
  label: "ABOUT" | "WORK" | "PROJECTS";
};
```

The hook can return:

```ts
{
  mediaState,
  currentTrack,
  isSupported,
}
```

### Step 4 — Silent Audio Loop

- Use Web Audio to create a tiny silent looping buffer.
- Start it only when the feature is enabled on the home page.
- Attempt startup when enabled.
- Retry startup on the first `pointerdown` or `keydown` because browsers often block autoplay until a user gesture.
- Stop and disconnect nodes when disabled or unmounted.

### Step 5 — Media Session Actions

Register these handlers only while enabled:

```ts
navigator.mediaSession.setActionHandler("nexttrack", handleNext);
navigator.mediaSession.setActionHandler("previoustrack", handlePrevious);
navigator.mediaSession.setActionHandler("play", handlePlay);
navigator.mediaSession.setActionHandler("pause", handlePause);
```

Behavior:

- `nexttrack`: reveal header, move to next site track, scroll to section, update metadata.
- `previoustrack`: reveal header, move to previous site track, scroll to section, update metadata.
- `play`: reveal header, show active state, try to ensure the silent loop is running.
- `pause`: reveal header, show easter egg briefly, then return to active state.

On cleanup, unregister handlers by setting each action handler to `null`.

### Step 6 — Wire `App.tsx`

- Add a `mediaSessionEnabled` signal initialized from `localStorage`.
- Pass `mediaSessionEnabled` and its setter into `TweaksPage`.
- On the home route, call the media-session hook with the enabled accessor.
- Pass the hook's `mediaState` and `currentTrack` to `HeaderSection`.
- Do not initialize the hook on `/tweaks`, except for support detection if needed for UI.

### Step 7 — Update `HeaderSection`

- Accept the media-session state as props.
- Keep the current empty header structure when disabled or idle.
- Render the now-playing bar only after discovery.
- Use `Play` and `Pause` from `phosphor-solid` with `weight="fill"`.
- Position the UI inside the existing header height to avoid layout shift.
- Match the current sparse visual style: small text, uppercase section labels, low-opacity borders/text.

### Step 8 — Verification

- Run `npm run build`.
- Confirm a fresh visitor has the feature off.
- Confirm `/tweaks` persists the setting.
- Confirm the home page does not start media-session behavior when disabled.
- Confirm enabling the setting activates the behavior on the home page.
- Confirm hardware next/previous navigates the portfolio sections.
- Confirm play/pause use filled Phosphor icons in the header.
- Confirm disabling the setting empties the header and stops the media-session behavior.

## Limitations

- This cannot control external apps or the user's real music playback.
- Browser autoplay policies may require a user gesture before the silent media session can start reliably.
- Media-key routing is browser and OS dependent.
- If another app or tab has the active media session, it may receive the media keys instead.
