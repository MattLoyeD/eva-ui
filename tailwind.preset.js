/**
 * EvaUI — Tailwind CSS Preset
 * NERV Design System tokens for Neon Genesis Evangelion UI
 *
 * Usage (Tailwind v3):
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('neon-genesis-evangelion-ui/tailwind.preset')],
 *     content: [
 *       './node_modules/neon-genesis-evangelion-ui/dist/**/*.{js,mjs}',
 *       // ... your own content paths
 *     ],
 *   }
 *
 * Usage (Tailwind v4):
 *   Import the CSS tokens directly in your main stylesheet:
 *   @import "neon-genesis-evangelion-ui/styles";
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        /* ── Core EVA Colors ── */
        "eva-black": "#000000",
        "eva-red": "#FF0000",
        "eva-orange": "#FF9900",
        "eva-green": "#00FF00",
        "eva-cyan": "#00FFFF",
        "eva-amber": "#FFAA00",
        "eva-white": "#E0E0E0",
        "eva-dark-gray": "#1A1A1A",
        "eva-mid-gray": "#555555",
        "eva-panel": "#0A0A0A",
        "eva-purple": "#9933FF",
        "eva-magenta": "#FF00FF",
        "eva-lcd-green": "#39FF14",

        /* ── Semantic Aliases ── */
        "bg-base": "#000000",
        "alert-red": "#FF0000",
        "text-orange": "#FF9900",
        "grid-green": "#00FF00",
        "data-blue": "#00FFFF",
        "magenta-wave": "#FF00FF",
        "lcd-green": "#39FF14",
      },

      fontFamily: {
        "eva-display": [
          "Oswald",
          "Impact",
          "Arial Narrow",
          "system-ui",
          "sans-serif",
        ],
        "eva-mono": [
          "Fira Code",
          "JetBrains Mono",
          "Courier New",
          "monospace",
        ],
        "eva-body": [
          "Barlow Condensed",
          "Arial Narrow",
          "system-ui",
          "sans-serif",
        ],
        "eva-title": [
          "Noto Serif JP",
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
      },

      keyframes: {
        "eva-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "52%": { opacity: "0.4" },
          "54%": { opacity: "0.9" },
          "56%": { opacity: "0.3" },
          "58%": { opacity: "1" },
        },
        "eva-blink-hard": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "eva-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "eva-glow": {
          "0%, 100%": {
            textShadow: "0 0 4px currentColor, 0 0 8px currentColor",
            filter: "brightness(1)",
          },
          "50%": {
            textShadow:
              "0 0 8px currentColor, 0 0 20px currentColor, 0 0 40px currentColor",
            filter: "brightness(1.2)",
          },
        },
        "cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "hazard-scroll": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "28.28px 0" },
        },
      },

      animation: {
        "eva-flicker": "eva-flicker 3s infinite",
        "eva-blink-hard": "eva-blink-hard 1s steps(1) infinite",
        "eva-pulse": "eva-pulse 2s ease-in-out infinite",
        "eva-glow": "eva-glow 2s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s steps(1) infinite",
        "hazard-scroll": "hazard-scroll 0.5s linear infinite",
      },
    },
  },
};
