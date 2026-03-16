"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  TitleScreen,
  type TitleScreenAppearance,
  type TitleScreenBlock,
  type TitleScreenTemplate,
} from "@/components";

const displayFont = { fontFamily: "var(--font-nerv-display)" };
const monoFont = { fontFamily: "var(--font-nerv-mono)" };

interface SplashScene {
  id: string;
  label: string;
  template: TitleScreenTemplate;
  appearance: TitleScreenAppearance;
  description: string;
  blocks: TitleScreenBlock[];
}

const scenes: SplashScene[] = [
  {
    id: "finale",
    label: "FINALE",
    template: "finale",
    appearance: "plain",
    description: "Closing-card composition with hard hierarchy and a quiet quote lockup.",
    blocks: [
      { role: "masthead", text: ["NEON", "GENESIS"], width: "narrow" },
      { role: "hero", text: "EVANGELION", size: "display", width: "full" },
      { role: "label", text: "FINALE:", font: "display", size: "md" },
      { role: "quote", text: "Take care of yourself.", size: "lg", width: "full" },
    ],
  },
  {
    id: "episode",
    label: "EPISODE",
    template: "episode",
    appearance: "plain",
    description: "Episode title card with a label rail top-left and the main beat dropped lower-right.",
    blocks: [
      { role: "label", text: "EPISODE:01", font: "display", size: "sm" },
      { role: "lead", text: "ANGEL", size: "xl", width: "medium" },
      { role: "hero", text: "ATTACK", size: "display", width: "wide" },
    ],
  },
  {
    id: "glow",
    label: "GLOW",
    template: "freeform",
    appearance: "glow",
    description: "Warm ceremonial splash for intros, banners, and branded EVA-style reveal screens.",
    blocks: [
      {
        role: "masthead",
        text: "UI",
        anchor: "top-left",
        size: "lg",
        width: "content",
        offsetY: "-5cqh",
      },
      { role: "lead", text: "LIBRARY", anchor: "top-left", size: "xl", width: "medium" },
      { role: "hero", text: "NERV-UI", anchor: "middle-left", size: "display", width: "full" },
      {
        role: "footer",
        text: "MDRBX/NERV-UI",
        anchor: "bottom-left",
        font: "display",
        tone: "primary",
        size: "md",
        width: "medium",
        offsetY: "-5cqh",
      },
      {
        role: "support",
        text: "世界の中心でアイを叫んだけもの",
        anchor: "bottom-center",
        tone: "primary",
        size: "md",
        width: "wide",
        offsetY: "3.5cqh",
      },
    ],
  },
];

export default function SplashExamplePage() {
  const [activeSceneId, setActiveSceneId] = useState(scenes[0].id);

  const activeScene = useMemo(() => {
    return scenes.find((scene) => scene.id === activeSceneId) ?? scenes[0];
  }, [activeSceneId]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <TitleScreen
        template={activeScene.template}
        appearance={activeScene.appearance}
        blocks={activeScene.blocks}
        className="!min-h-screen !pb-40 sm:!pb-48"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%,transparent_78%,rgba(255,255,255,0.04))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 sm:p-6">
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          <Link
            href="/examples"
            className="border border-nerv-white/25 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-nerv-white/75 transition-colors hover:border-nerv-white hover:bg-nerv-white hover:text-black"
            style={displayFont}
          >
            Back To Catalog
          </Link>
          <Link
            href="/docs/components/title-screen"
            className="border border-nerv-orange/35 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-nerv-orange transition-colors hover:border-nerv-orange hover:bg-nerv-orange hover:text-black"
            style={displayFont}
          >
            TitleScreen Docs
          </Link>
        </div>

        <div className="pointer-events-none hidden border border-nerv-white/15 bg-black/35 px-3 py-2 md:block">
          <div className="text-[9px] uppercase tracking-[0.22em] text-nerv-white/40" style={monoFont}>
            splash.route
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-nerv-white/85" style={displayFont}>
            ceremonial example
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl border border-nerv-white/15 bg-black/60 p-4 backdrop-blur-[2px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div
                className="text-[9px] uppercase tracking-[0.24em] text-nerv-white/40"
                style={monoFont}
              >
                live example // full-page title-screen
              </div>
              <h1
                className="mt-2 text-lg uppercase tracking-[0.22em] text-nerv-white sm:text-xl"
                style={displayFont}
              >
                {activeScene.label} Splash
              </h1>
              <p className="mt-2 max-w-xl text-xs leading-6 text-nerv-white/58 sm:text-[13px]" style={monoFont}>
                {activeScene.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {scenes.map((scene) => {
                const isActive = scene.id === activeScene.id;

                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setActiveSceneId(scene.id)}
                    className={`border px-3 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors ${
                      isActive
                        ? "border-nerv-white bg-nerv-white text-black"
                        : "border-nerv-white/25 text-nerv-white/70 hover:border-nerv-white hover:text-nerv-white"
                    }`}
                    style={displayFont}
                  >
                    {scene.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
