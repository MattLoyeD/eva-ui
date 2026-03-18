"use client";

import { useEffect, useState } from "react";
import {
  Card,
  EmergencyBanner,
  MagiSystemPanel,
  MonitorOverlay,
  PatternAlert,
  SegmentDisplay,
  StatusStamp,
  SurveillanceGrid,
  TerminalDisplay,
} from "@/components";
import type { MagiVote, SurveillanceFeed } from "@/components";

const displayFont = { fontFamily: "var(--font-nerv-display)" };
const monoFont = { fontFamily: "var(--font-nerv-mono)" };

type ChannelTheme = {
  accent: string;
  border: string;
  tint: string;
  color: "cyan" | "orange" | "red";
  videoPosition: string;
};

interface SubjectChannelProfile {
  designation: string;
  name: string;
  plug: string;
  unit: string;
  status: string;
  telemetry: string;
  theme: ChannelTheme;
}

const subjectChannels: SubjectChannelProfile[] = [
  {
    designation: "FIRST.C",
    name: "REI AYANAMI",
    plug: "TEST PLUG 00",
    unit: "MONITOR 00",
    status: "SYNC 68.4",
    telemetry: "POLARITY LOCK / BIAS-C",
    theme: {
      accent: "#00F6FF",
      border: "rgba(0, 246, 255, 0.34)",
      tint: "linear-gradient(180deg, rgba(12, 74, 184, 0.32), rgba(4, 8, 24, 0.18) 38%, rgba(0, 0, 0, 0.82))",
      color: "cyan",
      videoPosition: "12% center",
    },
  },
  {
    designation: "THIRD.C",
    name: "SHINJI IKARI",
    plug: "TEST PLUG 01",
    unit: "MONITOR 01",
    status: "SYNC 91.2",
    telemetry: "HARMONICS SHIFT / A-10",
    theme: {
      accent: "#7B8DFF",
      border: "rgba(123, 141, 255, 0.34)",
      tint: "linear-gradient(180deg, rgba(28, 20, 108, 0.3), rgba(4, 8, 24, 0.14) 40%, rgba(0, 0, 0, 0.82))",
      color: "orange",
      videoPosition: "center center",
    },
  },
  {
    designation: "SECOND.C",
    name: "S. ASUKA LANGLEY",
    plug: "TEST PLUG 02",
    unit: "MONITOR 02",
    status: "SYNC 77.6",
    telemetry: "MENTAL LOAD / ELEVATED",
    theme: {
      accent: "#FF5B43",
      border: "rgba(255, 91, 67, 0.34)",
      tint: "linear-gradient(180deg, rgba(112, 26, 44, 0.28), rgba(12, 8, 18, 0.14) 40%, rgba(0, 0, 0, 0.84))",
      color: "red",
      videoPosition: "88% center",
    },
  },
];

const phaseLabels = Array.from({ length: 10 }, (_, index) =>
  `PHASE ${String(index + 8).padStart(2, "0")}`
);

const logLines = [
  "CAM-A00 :: biometric lock refreshed",
  "CASPER-3 :: dissent window remains open",
  "BALTHASAR-2 :: video parity check passed",
  "MELCHIOR-1 :: thermal bloom isolated on lane 04",
  "ENTRY LOCK :: clamp pressure recalibrated",
  "PHASE BUS :: rail sync holding on tertiary spine",
  "SURVEILLANCE NET :: atlas relay switched to hot standby",
  "PATTERN WATCH :: orange-band residue detected",
  "REMOTE EYES :: no manual override registered",
  "MOTION CLUSTER :: sector 7G bias trending upward",
];

function SubjectChannel({
  channel,
  tick,
}: {
  channel: SubjectChannelProfile;
  tick: number;
}) {
  const pulsePhase = (tick + subjectChannels.findIndex((item) => item.name === channel.name)) % 6;
  const isElevated = pulsePhase >= 4;

  return (
    <div
      className="relative min-h-[24rem] overflow-hidden border bg-black"
      style={{
        borderColor: channel.theme.border,
        boxShadow: `inset 0 0 0 1px ${channel.theme.border}, 0 0 28px ${channel.theme.border.replace("0.34", "0.18")}`,
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        src="/media/ui.mp4"
        style={{ objectPosition: channel.theme.videoPosition, filter: "contrast(1.08) saturate(0.78) brightness(0.5)" }}
      />

      <div className="absolute inset-0" style={{ background: channel.theme.tint }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.82))]" />

      <MonitorOverlay
        color={channel.theme.color}
        density="dense"
        opacity={0.72}
        label={channel.designation}
        secondaryLabel={channel.status}
      />

      <div className="absolute inset-y-0 left-[50%] w-px -translate-x-1/2 bg-white/12" />

      <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-3 sm:left-4 sm:right-4 sm:top-4">
        <div>
          <div
            className="text-[0.78rem] uppercase tracking-[0.12em]"
            style={{ ...displayFont, color: channel.theme.accent }}
          >
            {channel.designation}
          </div>
          <div
            className="mt-1 text-[1.35rem] uppercase leading-none tracking-[0.08em] sm:text-[1.6rem]"
            style={{ ...displayFont, color: "#7FFF9F" }}
          >
            {channel.name}
          </div>
        </div>
        <div
          className="border px-2 py-1 text-right text-[9px] uppercase tracking-[0.16em]"
          style={{
            ...monoFont,
            color: isElevated ? "#FF9900" : channel.theme.accent,
            borderColor: isElevated ? "rgba(255,153,0,0.5)" : channel.theme.border,
            backgroundColor: "rgba(0,0,0,0.58)",
          }}
        >
          <div>FEED {isElevated ? "VECTORED" : "HELD"}</div>
          <div className="mt-1 opacity-70">{channel.telemetry}</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-3 right-3 grid grid-cols-[minmax(0,1fr)_auto] gap-3 sm:left-4 sm:right-4">
        <div className="grid gap-2">
          <div
            className="flex items-center justify-between border px-2 py-1 text-[10px] uppercase tracking-[0.15em]"
            style={{
              ...monoFont,
              color: "#FF7AB9",
              borderColor: "rgba(255, 122, 185, 0.35)",
              backgroundColor: "rgba(16, 0, 18, 0.6)",
            }}
          >
            <span>{channel.plug}</span>
            <span>{channel.unit}</span>
          </div>
          <div
            className="h-3 overflow-hidden border"
            style={{ borderColor: channel.theme.border, backgroundColor: "rgba(0,0,0,0.72)" }}
          >
            <div
              className="h-full"
              style={{
                width: isElevated ? "64%" : "88%",
                backgroundColor: isElevated ? "#FF2B1D" : "#7FFF9F",
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.38) 8px, rgba(0,0,0,0.38) 10px)",
              }}
            />
          </div>
        </div>
        <div
          className="flex min-w-[5.5rem] items-center justify-center border px-2 py-1 text-center text-[0.95rem] uppercase tracking-[0.08em]"
          style={{
            ...displayFont,
            color: isElevated ? "#FF2B1D" : "#FF7AB9",
            borderColor: isElevated ? "rgba(255,43,29,0.5)" : "rgba(255, 122, 185, 0.35)",
            backgroundColor: "rgba(0,0,0,0.68)",
          }}
        >
          {isElevated ? "CHECK ALT" : "CHECK O.K."}
        </div>
      </div>
    </div>
  );
}

function PhaseRailColumn({
  title,
  tick,
  offset,
}: {
  title: string;
  tick: number;
  offset: number;
}) {
  const dangerStart = 6 + ((tick + offset) % 2);

  return (
    <div className="border border-nerv-orange/35 bg-black/85 px-2 py-3">
      <div
        className="mb-2 flex items-center justify-between border-b border-nerv-orange/18 pb-2 text-[10px] uppercase tracking-[0.2em] text-nerv-orange"
        style={displayFont}
      >
        <span>{title}</span>
        <span className="text-nerv-white/40" style={monoFont}>
          0{offset + 1}
        </span>
      </div>

      <div className="grid gap-1.5">
        {phaseLabels.map((label, index) => {
          const isDanger = index >= dangerStart;
          const isWarning = !isDanger && index === dangerStart - 1;
          const barColor = isDanger ? "#FF2B1D" : isWarning ? "#FF9900" : "#7FFF9F";

          return (
            <div key={`${title}-${label}`} className="grid grid-cols-[3.9rem_minmax(0,1fr)] items-center gap-2">
              <span
                className="text-[9px] uppercase tracking-[0.12em] text-nerv-orange/86"
                style={monoFont}
              >
                {label}
              </span>
              <div className="relative h-5 overflow-hidden border border-nerv-orange/18 bg-black/80">
                <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-nerv-orange/65" />
                <div
                  className="absolute inset-y-0 left-0"
                  style={{
                    width: isDanger ? "100%" : isWarning ? "88%" : "92%",
                    backgroundColor: barColor,
                    boxShadow: `0 0 12px ${barColor}33`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeedTexture({
  label,
  tint,
  position,
}: {
  label: string;
  tint: string;
  position: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        src="/media/ui.mp4"
        style={{ objectPosition: position, filter: "contrast(1.12) saturate(0.75) brightness(0.46)" }}
      />
      <div className="absolute inset-0" style={{ background: tint }} />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_3px,rgba(255,255,255,0.04)_3px,rgba(255,255,255,0.04)_6px)]" />
      <div
        className="absolute bottom-2 left-2 border px-2 py-1 text-[9px] uppercase tracking-[0.18em] text-nerv-white/72"
        style={{ ...monoFont, borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(0,0,0,0.62)" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function SurveillanceDeckPage() {
  const [tick, setTick] = useState(0);
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const advance = window.setInterval(() => {
      setTick((value) => value + 1);
    }, 1400);

    const updateClock = () => {
      const now = new Date();
      setClock(
        `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
      );
    };

    updateClock();
    const clockTimer = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(advance);
      window.clearInterval(clockTimer);
    };
  }, []);

  const verdictIndex = tick % 3;
  const magiVotes: MagiVote[] = [
    {
      name: "MELCHIOR-1",
      status: verdictIndex === 0 ? "accepted" : verdictIndex === 1 ? "computing" : "idle",
    },
    {
      name: "BALTHASAR-2",
      status: verdictIndex === 1 ? "accepted" : verdictIndex === 2 ? "computing" : "idle",
    },
    {
      name: "CASPER-3",
      status: verdictIndex === 2 ? "rejected" : verdictIndex === 0 ? "computing" : "idle",
    },
  ];

  const terminalWindow = Array.from({ length: 7 }, (_, index) => logLines[(tick + index) % logLines.length]);

  const feedStates = ["active", "warning", "active", tick % 4 === 0 ? "signal-lost" : "active"] as const;
  const surveillanceFeeds: SurveillanceFeed[] = [
    {
      id: "CAM-01",
      label: "Entry plug // left bank",
      subLabel: "monitor relay",
      status: feedStates[0],
      children: <FeedTexture label="dock-a" tint="linear-gradient(180deg, rgba(0, 246, 255, 0.18), rgba(0,0,0,0.78))" position="15% center" />,
    },
    {
      id: "CAM-02",
      label: "Signal cradle // mid",
      subLabel: "phase transition",
      status: feedStates[1],
      children: <FeedTexture label="spine-b" tint="linear-gradient(180deg, rgba(255, 153, 0, 0.16), rgba(0,0,0,0.78))" position="50% center" />,
    },
    {
      id: "CAM-03",
      label: "Launch rack // right bank",
      subLabel: "warm standby",
      status: feedStates[2],
      children: <FeedTexture label="rack-c" tint="linear-gradient(180deg, rgba(127, 255, 159, 0.16), rgba(0,0,0,0.78))" position="82% center" />,
    },
    {
      id: "CAM-04",
      label: "Lower trench // aux relay",
      subLabel: "packet integrity",
      status: feedStates[3],
      children: <FeedTexture label="aux-d" tint="linear-gradient(180deg, rgba(255, 43, 29, 0.18), rgba(0,0,0,0.82))" position="65% center" />,
    },
  ];

  return (
    <div className="min-h-screen bg-nerv-black pb-8">
      <div className="relative overflow-hidden border-b border-nerv-red/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,43,29,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(0,246,255,0.1),transparent_28%)]" />

        <div className="relative mx-auto max-w-[1680px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end">
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.32em] text-nerv-red/70"
                style={displayFont}
              >
                tactical surveillance array
              </div>
              <h1
                className="mt-2 text-[2.2rem] uppercase leading-none tracking-[0.18em] text-nerv-orange sm:text-[3rem] lg:text-[3.7rem]"
                style={displayFont}
              >
                Video Intercept Deck
              </h1>
              <p
                className="mt-3 max-w-4xl text-[12px] leading-7 text-nerv-white/58 sm:text-[13px]"
                style={monoFont}
              >
                Nervous, high-density monitoring surface with stacked pilot feeds, MAGI arbitration,
                and sidebar phase rails. Built to feel like a live command deck rather than a static demo page.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="border border-nerv-red/25 bg-black/60 px-3 py-2">
                <div className="text-[8px] uppercase tracking-[0.22em] text-nerv-white/35" style={monoFont}>
                  subjects
                </div>
                <div className="mt-1 text-2xl uppercase tracking-[0.16em] text-nerv-orange" style={displayFont}>
                  03
                </div>
              </div>
              <div className="border border-nerv-red/25 bg-black/60 px-3 py-2">
                <div className="text-[8px] uppercase tracking-[0.22em] text-nerv-white/35" style={monoFont}>
                  magi
                </div>
                <div className="mt-1 text-sm uppercase tracking-[0.16em] text-nerv-cyan" style={displayFont}>
                  voting
                </div>
              </div>
              <div className="border border-nerv-red/25 bg-black/60 px-3 py-2">
                <div className="text-[8px] uppercase tracking-[0.22em] text-nerv-white/35" style={monoFont}>
                  clock
                </div>
                <div className="mt-1 text-sm uppercase tracking-[0.16em] text-nerv-green" style={displayFont}>
                  {clock}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmergencyBanner
        text="SURVEILLANCE NET ACTIVE"
        subtext="MULTI-SUBJECT RELAY LOCKED — SIDEBAR PHASE BUSES NOW TRACKING HOT PATHS"
        severity="warning"
        visible
      />

      <div className="mx-auto grid max-w-[1680px] gap-4 px-4 pt-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
        <div className="grid gap-4">
          <section className="grid gap-4 xl:grid-cols-3">
            {subjectChannels.map((channel) => (
              <SubjectChannel key={channel.name} channel={channel} tick={tick} />
            ))}
          </section>

          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.95fr)]">
            <Card
              variant="video"
              eyebrow="magi verdict braid"
              title="Consensus lattice"
              subtitle="Three-channel arbitration surface inspired by the angular MAGI routing diagrams."
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <PatternAlert
                  designation={verdictIndex === 2 ? "VOTE DISSENT" : "VOTE CONVERGENCE"}
                  bloodType={verdictIndex === 2 ? "ORANGE" : "BLUE"}
                  color={verdictIndex === 2 ? "red" : "orange"}
                  subtitle="consensus pressure shifting across surveillance bus"
                  className="min-h-[0] h-[14rem]"
                />
                <MagiSystemPanel
                  votes={magiVotes}
                  trapezoidal
                  title="MAGI / CAMERA CONSENSUS"
                />
              </div>
            </Card>

            <Card
              variant="hud"
              eyebrow="routing console"
              title="Live relay core"
              subtitle="Video ingest, rail pressure, and verdict traffic cycling in real time."
            >
              <div className="grid gap-4">
                <div className="grid gap-3 xl:grid-cols-[auto_1fr_auto] xl:items-center">
                  <SegmentDisplay value={314} format="raw" digits={3} size="lg" color="orange" label="LANE" />
                  <div className="border border-nerv-white/10 px-3 py-2">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-nerv-white/38" style={monoFont}>
                      relay status
                    </div>
                    <div className="mt-2 text-[1.05rem] uppercase tracking-[0.12em] text-nerv-cyan" style={displayFont}>
                      packet stabilizer engaged
                    </div>
                  </div>
                  <div className="border border-nerv-red/22 bg-black/70 px-3 py-2 xl:min-w-[12rem]">
                    <div className="text-[9px] uppercase tracking-[0.2em] text-nerv-white/35" style={monoFont}>
                      signal verdict
                    </div>
                    <div
                      className={`mt-2 text-[1.4rem] uppercase leading-none tracking-[0.08em] ${
                        tick % 4 === 0 ? "text-nerv-red" : "text-nerv-orange"
                      }`}
                      style={displayFont}
                    >
                      {tick % 4 === 0 ? "locked" : "tracked"}
                    </div>
                    <div className="mt-2 text-[9px] uppercase tracking-[0.16em] text-nerv-white/46" style={monoFont}>
                      lane // stamp readable in dedicated panel
                    </div>
                  </div>
                </div>

                <TerminalDisplay
                  title="SURVEILLANCE.LOG"
                  lines={terminalWindow}
                  color="cyan"
                  showLineNumbers
                  prompt=">"
                  maxHeight="320px"
                  className="bg-black/80"
                />
              </div>
            </Card>
          </section>

          <section>
            <Card
              variant="default"
              eyebrow="camera grid"
              title="Secondary intercept windows"
              subtitle="Four compact feeds using the library surveillance component so the page reads like a working monitoring station."
            >
              <SurveillanceGrid
                feeds={surveillanceFeeds}
                columns={4}
                color="orange"
                title="SURVEILLANCE FEEDS"
                className="border-none"
              />
            </Card>
          </section>
        </div>

        <aside className="grid content-start gap-4">
          <Card
            variant="alert"
            eyebrow="phase bus"
            title="Rail degradation"
            subtitle="Sidebar bars echo the aggressive phase stacks from the source references without depending on raster art."
          >
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                <PhaseRailColumn title="CASPER" tick={tick} offset={0} />
                <PhaseRailColumn title="BALTHASAR" tick={tick} offset={1} />
                <PhaseRailColumn title="MELCHIOR" tick={tick} offset={2} />
              </div>
            </div>
          </Card>

          <Card
            variant="video"
            eyebrow="override lane"
            title="Tactical stamp"
            subtitle="A dedicated slot keeps StatusStamp readable instead of clipping inside compressed cards."
          >
            <div className="grid gap-3">
              <StatusStamp
                text={tick % 5 === 0 ? "REFUSED" : "PRIORITY"}
                color={tick % 5 === 0 ? "red" : "orange"}
                subtitle="clearance marker"
                bordered
                doubleBordered
                className="min-h-[12rem]"
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-nerv-orange/18 bg-black/60 px-3 py-2">
                  <div className="text-[8px] uppercase tracking-[0.22em] text-nerv-white/35" style={monoFont}>
                    phase bus
                  </div>
                  <div className="mt-1 text-[1.1rem] uppercase tracking-[0.14em] text-nerv-orange" style={displayFont}>
                    hot path
                  </div>
                </div>
                <div className="border border-nerv-orange/18 bg-black/60 px-3 py-2">
                  <div className="text-[8px] uppercase tracking-[0.22em] text-nerv-white/35" style={monoFont}>
                    hold rate
                  </div>
                  <div className="mt-1 text-[1.1rem] uppercase tracking-[0.14em] text-nerv-green" style={displayFont}>
                    88.1
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
