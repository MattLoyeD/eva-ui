# `> DESIGN_TOKEN_SPECIFICATION`

```
╔══════════════════════════════════════════════════════════╗
║  NERV TECHNICAL DOCUMENTATION — VISUAL SYSTEMS          ║
║  NERV-UI Design Tokens — Color, Typography & Animation     ║
╚══════════════════════════════════════════════════════════╝
```

All design tokens are defined in `src/app/globals.css` using Tailwind CSS 4's `@theme` block. This makes them available both as CSS custom properties and as Tailwind utility classes.

---

## `> COLOR_SYSTEM`

### Core EVA Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--color-nerv-black` | `#000000` | `bg-nerv-black` | Primary background, the void |
| `--color-nerv-red` | `#FF0000` | `text-nerv-red` | Emergency alerts, danger states |
| `--color-nerv-orange` | `#FF9900` | `text-nerv-orange` | Primary text, UI accents, default |
| `--color-nerv-green` | `#00FF00` | `text-nerv-green` | Terminal text, grid lines, nominal |
| `--color-nerv-cyan` | `#00FFFF` | `text-nerv-cyan` | Data readouts, information |
| `--color-nerv-amber` | `#FFAA00` | `text-nerv-amber` | Warning states |
| `--color-nerv-white` | `#E0E0E0` | `text-nerv-white` | High-contrast text |
| `--color-nerv-dark-gray` | `#1A1A1A` | `bg-nerv-dark-gray` | Panel backgrounds |
| `--color-nerv-mid-gray` | `#333333` | `border-nerv-mid-gray` | Borders, dividers |
| `--color-nerv-panel` | `#0A0A0A` | `bg-nerv-panel` | Scrollbar track, panels |
| `--color-nerv-purple` | `#9933FF` | `text-nerv-purple` | Special indicators |
| `--color-nerv-magenta` | `#FF00FF` | `text-nerv-magenta` | Waveform accents |
| `--color-nerv-lcd-green` | `#39FF14` | `text-nerv-lcd-green` | LCD displays, timers |

### Semantic Aliases

These aliases map to specific use cases in the interface:

| Token | Hex | Tailwind Class | Semantic Use |
|-------|-----|----------------|--------------|
| `--color-bg-base` | `#000000` | `bg-bg-base` | Page background |
| `--color-alert-red` | `#FF0000` | `border-alert-red` | Emergency borders |
| `--color-text-orange` | `#FF9900` | `text-text-orange` | Default text color |
| `--color-grid-green` | `#00FF00` | `border-grid-green` | Normal state borders |
| `--color-data-blue` | `#00FFFF` | `text-data-blue` | Informational data |
| `--color-magenta-wave` | `#FF00FF` | `text-magenta-wave` | Waveform B color |
| `--color-lcd-green` | `#39FF14` | `text-lcd-green` | LCD timer displays |

---

## `> TYPOGRAPHY`

### Font Stacks

| Token | Fonts | Tailwind Usage | Role |
|-------|-------|----------------|------|
| `--font-nerv-display` | Oswald, Impact, Arial Narrow, system-ui | `font-[var(--font-nerv-display)]` | Section headers, labels, all-caps display |
| `--font-nerv-mono` | Fira Code, JetBrains Mono, Courier New, monospace | `font-mono` | Terminal output, data readouts, code |
| `--font-nerv-body` | Barlow Condensed, Arial Narrow, system-ui | Default body font | Body text, descriptions |
| `--font-nerv-title` | Noto Serif JP, Playfair Display, Georgia, serif | `font-[var(--font-nerv-title)]` | Cinematic title screens |

### Font Loading

Fonts are loaded via Google Fonts CDN in `layout.tsx`:

```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&family=Barlow+Condensed:wght@300;400;500;600;700&family=Noto+Serif+JP:wght@400;700;900&family=Playfair+Display:wght@400;700;900&display=swap" rel="stylesheet" />
```

### Typography Rules

- **All caps everywhere** — `uppercase` + `tracking-[0.2em]` for labels
- **Tight kerning** on titles — `letter-spacing: -0.04em`, `line-height: 0.85`
- **No border-radius** — `border-radius: 0 !important` global override
- **Tabular numbers** — `tabular-nums` on all numeric displays

---

## `> UTILITY_CLASSES`

### Text Glow Effects

```css
.nerv-text-shadow-orange   /* 0 0 4px #FF9900, 0 0 8px rgba(255,153,0,0.3) */
.nerv-text-shadow-red      /* 0 0 4px #FF0000, 0 0 8px rgba(255,0,0,0.3)   */
.nerv-text-shadow-green    /* 0 0 4px #00FF00, 0 0 8px rgba(0,255,0,0.3)   */
.nerv-text-shadow-cyan     /* 0 0 4px #00FFFF, 0 0 8px rgba(0,255,255,0.3) */
```

### Border Glow Effects

```css
.nerv-border-glow-orange   /* box-shadow: 0 0 4px rgba(255,153,0,0.3), inset 0 0 4px rgba(255,153,0,0.1) */
.nerv-border-glow-red      /* box-shadow: 0 0 8px rgba(255,0,0,0.4), inset 0 0 4px rgba(255,0,0,0.1)     */
```

### Hazard Stripes

```css
.hazard-stripes           /* Red/transparent diagonal stripes, animated scroll */
.hazard-stripes-black     /* Red/black diagonal stripes, animated scroll      */
```

Both use `repeating-linear-gradient(-45deg, ...)` with a continuous `hazard-scroll` animation at 0.5s per cycle.

---

## `> ANIMATIONS`

### Keyframe Animations

| Animation | Duration | Description |
|-----------|----------|-------------|
| `nerv-flicker` | Irregular | Rapid opacity flicker (CRT malfunction) |
| `nerv-blink-hard` | Binary | Hard on/off blink (50% duty cycle) |
| `nerv-pulse` | Smooth | Gentle opacity pulse (1 → 0.6 → 1) |
| `nerv-glow` | Smooth | Text shadow intensification pulse |
| `cursor-blink` | Binary | Terminal cursor blink |
| `typewriter-cursor` | Binary | Typewriter border-color blink |
| `data-scroll` | Linear | Vertical scroll translate (for data feeds) |
| `hazard-scroll` | 0.5s | Diagonal stripe movement |

### CRT Scanline Overlay

A global `body::after` pseudo-element applies a subtle scanline effect across the entire viewport:

```css
body::after {
  background: repeating-linear-gradient(
    0deg,
    transparent, transparent 2px,
    rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
  );
}
```

### Reduced Motion

All animations are disabled when `prefers-reduced-motion: reduce` is active:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  body::after { display: none; }
}
```

---

## `> GLOBAL_STYLES`

### Selection Colors

```css
::selection {
  background: #FF9900;
  color: #000000;
}
```

### Scrollbar (WebKit)

```css
::-webkit-scrollbar        { width: 6px; }
::-webkit-scrollbar-track  { background: #0A0A0A; border-left: 1px solid #333; }
::-webkit-scrollbar-thumb  { background: #FF9900; }
::-webkit-scrollbar-thumb:hover { background: #FF0000; }
```

### Zero Border Radius

```css
*, *::before, *::after {
  border-radius: 0 !important;
}
```

This is enforced globally with `!important` to maintain the brutalist aesthetic across all components, including third-party elements.
