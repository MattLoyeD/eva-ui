"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { TargetingContainer } from "@/components/TargetingContainer";
import { HexGridBackground } from "@/components/HexGridBackground";
import { Button } from "@/components/Button";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { DataGrid } from "@/components/DataGrid";
import { SystemDialog } from "@/components/SystemDialog";
import { NavigationTabs } from "@/components/NavigationTabs";
import { MagiSystemPanel } from "@/components/MagiSystemPanel";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { CountdownTimer } from "@/components/CountdownTimer";
import { SeeleMonolith } from "@/components/SeeleMonolith";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";
import { systemLogs, terminalLines, pilotSyncData } from "@/lib/mock-data";

// Navigation tabs for the sidebar
const navTabs = [
  { id: "overview", label: "OVERVIEW" },
  { id: "pilots", label: "PILOT STATUS" },
  { id: "defense", label: "DEFENSE GRID" },
  { id: "magi", label: "MAGI SYSTEM" },
  { id: "logs", label: "SYSTEM LOGS" },
];

// Alert level options
const alertLevels = [
  { value: "standard", label: "STANDARD" },
  { value: "elevated", label: "ELEVATED" },
  { value: "critical", label: "CRITICAL" },
  { value: "emergency", label: "EMERGENCY" },
];

// DataGrid columns for system logs
const logColumns = [
  { key: "time", header: "TIME", width: "90px" },
  { key: "level", header: "LEVEL", width: "70px" },
  { key: "source", header: "SOURCE", width: "100px" },
  { key: "message", header: "MESSAGE" },
];

// DataGrid columns for pilot sync
const pilotColumns = [
  { key: "pilot", header: "PILOT", width: "120px" },
  { key: "unit", header: "UNIT", width: "80px" },
  { key: "sync", header: "SYNC %", width: "80px", align: "right" as const },
  { key: "status", header: "STATUS", width: "100px" },
];

export default function NervCommandCenter() {
  const [activeTab, setActiveTab] = useState("overview");
  const [alertLevel, setAlertLevel] = useState("standard");
  const [showEmergency, setShowEmergency] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [commandInput, setCommandInput] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [systemLoad, setSystemLoad] = useState(42);
  const [atFieldStrength, setAtFieldStrength] = useState(78);
  const [syncRate, setSyncRate] = useState(55.2);
  const [lcl, setLcl] = useState(23);
  const [magiMelchior, setMagiMelchior] = useState<"idle" | "computing" | "accepted" | "rejected">("idle");
  const [magiBalthasar, setMagiBalthasar] = useState<"idle" | "computing" | "accepted" | "rejected">("idle");
  const [magiCasper, setMagiCasper] = useState<"idle" | "computing" | "accepted" | "rejected">("idle");
  const [classifiedUnlocked, setClassifiedUnlocked] = useState(false);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulated live gauge fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad((v) => Math.max(20, Math.min(95, v + (Math.random() - 0.5) * 4)));
      setAtFieldStrength((v) => Math.max(40, Math.min(99, v + (Math.random() - 0.5) * 3)));
      setSyncRate((v) => Math.max(30, Math.min(99, v + (Math.random() - 0.5) * 2)));
      setLcl((v) => Math.max(10, Math.min(60, v + (Math.random() - 0.5) * 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerEmergency = useCallback(() => {
    setShowEmergency(true);
    setTimeout(() => setShowEmergency(false), 4000);
  }, []);

  // MAGI voting simulation
  const triggerMagiVote = useCallback(() => {
    setMagiMelchior("computing");
    setMagiBalthasar("computing");
    setMagiCasper("computing");
    setTimeout(() => setMagiMelchior("accepted"), 1500);
    setTimeout(() => setMagiBalthasar("accepted"), 2800);
    setTimeout(() => setMagiCasper("rejected"), 3500);
    setTimeout(() => {
      setMagiMelchior("idle");
      setMagiBalthasar("idle");
      setMagiCasper("idle");
    }, 7000);
  }, []);

  const isEmergencyMode = alertLevel === "emergency" || alertLevel === "critical";

  return (
    <div className="min-h-screen bg-eva-black relative overflow-hidden">
      {/* Background hex grid */}
      <HexGridBackground
        color={isEmergencyMode ? "#FF0000" : "#FF9900"}
        opacity={0.03}
        animated
      />

      {/* Emergency overlay */}
      <EmergencyBanner
        text={alertLevel === "emergency" ? "EMERGENCY" : "WARNING"}
        subtext="PATTERN BLUE DETECTED — ALL PERSONNEL TO BATTLE STATIONS"
        visible={showEmergency}
        severity={alertLevel === "emergency" ? "emergency" : "warning"}
        fullScreen
      />

      {/* System dialog */}
      <SystemDialog
        open={showDialog}
        title="OVERRIDE CONFIRMATION"
        severity="critical"
        acceptText="OVERRIDE"
        declineText="CANCEL"
        showHazardStripes
        onAccept={() => {
          setShowDialog(false);
          triggerEmergency();
        }}
        onDecline={() => setShowDialog(false)}
        onClose={() => setShowDialog(false)}
      >
        <p className="mb-2">
          You are about to trigger a manual system override.
        </p>
        <p className="text-eva-red">
          This action will escalate to EMERGENCY status. Are you sure?
        </p>
      </SystemDialog>

      {/* ====== MAIN LAYOUT ====== */}
      <div className="relative z-10 flex min-h-screen">
        {/* ─── Sidebar ─── */}
        <aside className="w-56 shrink-0 bg-eva-panel border-r border-eva-mid-gray flex flex-col">
          {/* NERV Logo / Branding */}
          <div className="px-4 py-5 border-b border-eva-mid-gray">
            <div className="flex items-center gap-2">
              {/* Stylized NERV mark */}
              <div className="w-8 h-8 border-2 border-eva-orange flex items-center justify-center">
                <div className="w-3 h-3 bg-eva-orange" />
              </div>
              <div>
                <h1
                  className="text-lg font-bold tracking-[0.3em] text-eva-orange"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  NERV
                </h1>
                <p className="text-[9px] tracking-[0.15em] text-eva-mid-gray font-mono">
                  GOD&apos;S IN HIS HEAVEN
                </p>
              </div>
            </div>
          </div>

          {/* Nav tabs */}
          <NavigationTabs
            tabs={navTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            direction="vertical"
            color={isEmergencyMode ? "green" : "orange"}
          />

          {/* Bottom status */}
          <div className="mt-auto p-4 border-t border-eva-mid-gray">
            <div className="text-[10px] font-mono text-eva-mid-gray space-y-1">
              <div className="flex justify-between">
                <span>MAGI STATUS</span>
                <span className="text-eva-green">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>ALERT LEVEL</span>
                <span
                  className={
                    isEmergencyMode ? "text-eva-red" : "text-eva-orange"
                  }
                >
                  {alertLevel.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>UPTIME</span>
                <span className="text-eva-cyan">847:23:41</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* ─── Header ─── */}
          <header
            className={`
              flex items-center justify-between px-6 py-3
              border-b-2
              ${isEmergencyMode ? "border-eva-red bg-eva-red/5" : "border-eva-mid-gray bg-eva-dark-gray"}
              transition-colors duration-300
            `}
          >
            <div className="flex items-center gap-4">
              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <motion.div
                  className={`w-2.5 h-2.5 ${isEmergencyMode ? "bg-eva-red" : "bg-eva-green"}`}
                  animate={{ opacity: isEmergencyMode ? [1, 0, 1] : 1 }}
                  transition={isEmergencyMode ? { duration: 0.5, repeat: Infinity } : {}}
                />
                <span
                  className={`text-sm uppercase tracking-[0.2em] font-bold ${
                    isEmergencyMode ? "text-eva-red" : "text-eva-green"
                  }`}
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {isEmergencyMode ? "CONDITION RED" : "ALL SYSTEMS NORMAL"}
                </span>
              </div>

              {/* Separator */}
              <div className="w-px h-5 bg-eva-mid-gray" />

              {/* Section label */}
              <span
                className="text-xs uppercase tracking-[0.15em] text-eva-mid-gray"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {navTabs.find((t) => t.id === activeTab)?.label || "OVERVIEW"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-eva-cyan">
                TOKYO-3 | GEOFRONT L-02
              </span>
              <span
                className="text-sm font-mono text-eva-orange tabular-nums eva-text-shadow-orange"
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {currentTime || "00:00:00"}
              </span>
            </div>
          </header>

          {/* ─── Dashboard Grid ─── */}
          <div className="flex-1 p-4 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-12 gap-4 h-full"
              >
                {/* ═══ LEFT COLUMN (8 cols) ═══ */}
                <div className="col-span-8 flex flex-col gap-4">
                  {/* Row 1: Progress bars */}
                  <TargetingContainer label="SYSTEM TELEMETRY" color={isEmergencyMode ? "red" : "orange"}>
                    <div className="grid grid-cols-2 gap-4">
                      <SyncProgressBar value={systemLoad} label="MAGI CORE LOAD" blocks={20} />
                      <SyncProgressBar value={atFieldStrength} label="A.T. FIELD INTEGRITY" blocks={20} />
                      <SyncProgressBar value={syncRate} label="SYNC RATE" blocks={20} />
                      <SyncProgressBar value={lcl} label="LCL PRESSURE" blocks={20} />
                    </div>
                  </TargetingContainer>

                  {/* Row 2: Data Grid / Logs */}
                  <div className="flex-1 min-h-0">
                    <DataGrid
                      title="SYSTEM EVENT LOG"
                      columns={logColumns}
                      data={systemLogs}
                      color={isEmergencyMode ? "orange" : "green"}
                      autoScroll
                      scrollSpeed={20}
                      maxHeight="300px"
                      showIndex
                    />
                  </div>

                  {/* Row 3: Sync Ratio Waveform */}
                  <TargetingContainer label="HARMONIC WAVEFORM ANALYSIS" color="cyan">
                    <SyncRatioChart
                      height={140}
                      showGrid
                      animated
                    />
                  </TargetingContainer>

                  {/* Row 4: Pilot sync data (classified) */}
                  <ClassifiedOverlay
                    visible={!classifiedUnlocked}
                    level="CLASSIFIED"
                    subtitle="PILOT BIOMETRIC DATA — CLEARANCE LEVEL 4"
                    unlockable
                    unlockCode="NERV"
                    onUnlock={() => setClassifiedUnlocked(true)}
                  >
                    <DataGrid
                      title="EVANGELION PILOT SYNCHRONIZATION"
                      columns={pilotColumns}
                      data={pilotSyncData}
                      color="cyan"
                      maxHeight="200px"
                    />
                  </ClassifiedOverlay>
                </div>

                {/* ═══ RIGHT COLUMN (4 cols) ═══ */}
                <div className="col-span-4 flex flex-col gap-4">
                  {/* Terminal Display */}
                  <TerminalDisplay
                    title="MAGI TERMINAL"
                    lines={terminalLines}
                    typewriter
                    typeSpeed={25}
                    color="green"
                    maxHeight="260px"
                    showCursor
                  />

                  {/* Control Panel */}
                  <TargetingContainer label="CONTROL PANEL" color="orange">
                    <div className="space-y-4">
                      <InputField
                        label="COMMAND INPUT"
                        placeholder="Enter command..."
                        color="orange"
                        value={commandInput}
                        onChange={(e) => setCommandInput(e.target.value)}
                      />

                      <SelectMenu
                        label="ALERT LEVEL"
                        options={alertLevels}
                        color={isEmergencyMode ? "green" : "orange"}
                        value={alertLevel}
                        onChange={(e) => setAlertLevel(e.target.value)}
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            if (alertLevel === "emergency" || alertLevel === "critical") {
                              triggerEmergency();
                            }
                          }}
                        >
                          EXECUTE
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setShowDialog(true);
                            triggerMagiVote();
                          }}
                        >
                          OVERRIDE
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm" fullWidth>
                        RESET TO STANDARD
                      </Button>
                    </div>
                  </TargetingContainer>

                  {/* MAGI System Panel */}
                  <MagiSystemPanel
                    melchior={magiMelchior}
                    balthasar={magiBalthasar}
                    casper={magiCasper}
                  />

                  {/* Countdown Timer */}
                  <div className="border border-eva-mid-gray bg-eva-panel p-4">
                    <h3
                      className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange mb-3"
                      style={{ fontFamily: "var(--font-eva-display)" }}
                    >
                      OPERATION TIMER
                    </h3>
                    <CountdownTimer
                      duration={300}
                      label="UNTIL CONTACT"
                      running
                    />
                  </div>

                  {/* SEELE Council */}
                  <div className="border border-eva-mid-gray bg-eva-panel p-3">
                    <h3
                      className="text-xs uppercase tracking-[0.2em] font-bold text-eva-orange mb-3"
                      style={{ fontFamily: "var(--font-eva-display)" }}
                    >
                      SEELE COUNCIL
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {["01", "02", "03", "04", "05", "06"].map((n, i) => (
                        <SeeleMonolith
                          key={n}
                          label={n}
                          isSpeaking={i === 0 || i === 2}
                          className="min-h-[80px]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── Footer Status Bar ─── */}
          <footer className="px-6 py-1.5 border-t border-eva-mid-gray bg-eva-dark-gray flex items-center justify-between text-[10px] font-mono text-eva-mid-gray">
            <div className="flex items-center gap-4">
              <span>NERV HQ — CENTRAL DOGMA</span>
              <span className="text-eva-mid-gray">|</span>
              <span>
                EvaUI v0.1.0 —{" "}
                <span className="text-eva-orange">DESIGN SYSTEM</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>SECURE CHANNEL</span>
              <span className="text-eva-green">ENCRYPTED</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
