"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import { DataGrid } from "@/components/DataGrid";
import { GradientStatusBar } from "@/components/GradientStatusBar";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { PilotCard } from "@/components/PilotCard";
import { NavigationTabs } from "@/components/NavigationTabs";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Accordion, AccordionItem } from "@/components/Accordion";
import { SyncRatioChart } from "@/components/SyncRatioChart";

// ─── Types ───

interface PilotRecord {
  id: string;
  designation: string;
  name: string;
  unit: string;
  childTitle: string;
  color: "red" | "cyan" | "green" | "orange";
  plugNumber: string;
  checkStatus: "O.K." | "ERROR" | "OFFLINE" | "SYNC";
  status: "active" | "archived";
  syncRate: number;
  mentalStability: number;
  psychNotes: string;
  syncWave: { freqA: number; freqB: number; ampA: number; ampB: number; phaseA: number; phaseB: number };
  combatLog: { mission: string; date: string; result: string; syncRate: string }[];
  fields: { label: string; value: string; status?: "ok" | "warning" | "critical" | "unknown" }[];
}

// ─── Mock data ───

const pilots: PilotRecord[] = [
  {
    id: "P-001",
    designation: "FIRST CHILD",
    name: "REI AYANAMI",
    unit: "EVA-00",
    childTitle: "First Child",
    color: "cyan",
    plugNumber: "00",
    checkStatus: "O.K.",
    status: "active",
    syncRate: 68.2,
    mentalStability: 42,
    psychNotes: "Subject displays extreme emotional detachment. Minimal self-preservation instinct. Compliance rate: 100%. Recommend continued observation. Identity continuity concerns flagged — CLASSIFIED.",
    syncWave: { freqA: 0.035, freqB: 0.05, ampA: 45, ampB: 35, phaseA: 0, phaseB: 1.5 },
    combatLog: [
      { mission: "OP-YASHIMA", date: "2015-06-22", result: "SUCCESS", syncRate: "72.1%" },
      { mission: "OP-SAHAQUIEL", date: "2015-09-03", result: "SUCCESS", syncRate: "64.8%" },
      { mission: "OP-RAMIEL", date: "2015-06-12", result: "UNIT LOSS", syncRate: "41.3%" },
      { mission: "OP-ARMISAEL", date: "2015-12-18", result: "SELF-DESTRUCT", syncRate: "89.7%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "68.2%", status: "warning" },
      { label: "STATUS", value: "ACTIVE", status: "ok" },
      { label: "CLEARANCE", value: "LEVEL-7", status: "ok" },
    ],
  },
  {
    id: "P-002",
    designation: "THIRD CHILD",
    name: "SHINJI IKARI",
    unit: "EVA-01",
    childTitle: "Third Child",
    color: "orange",
    plugNumber: "01",
    checkStatus: "O.K.",
    status: "active",
    syncRate: 94.1,
    mentalStability: 31,
    psychNotes: "Severe abandonment complex. High correlation between emotional distress and sync rate spikes. Prone to withdrawal under pressure. Hedgehog's dilemma noted. AT Field resonance anomalous — potential for uncontrolled awakening.",
    syncWave: { freqA: 0.04, freqB: 0.055, ampA: 55, ampB: 45, phaseA: 0.3, phaseB: 1.0 },
    combatLog: [
      { mission: "OP-SACHIEL", date: "2015-06-06", result: "SUCCESS", syncRate: "41.3%" },
      { mission: "OP-ZERUEL", date: "2015-11-02", result: "BERSERK", syncRate: "400.0%" },
      { mission: "OP-BARDIEL", date: "2015-10-10", result: "PILOT REFUSAL", syncRate: "0.0%" },
      { mission: "OP-ARAEL", date: "2015-12-05", result: "SUPPORT ROLE", syncRate: "88.4%" },
      { mission: "OP-TABRIS", date: "2016-01-01", result: "SUCCESS", syncRate: "96.2%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "94.1%", status: "ok" },
      { label: "STATUS", value: "ACTIVE", status: "ok" },
      { label: "CLEARANCE", value: "LEVEL-7", status: "ok" },
    ],
  },
  {
    id: "P-003",
    designation: "SECOND CHILD",
    name: "ASUKA LANGLEY",
    unit: "EVA-02",
    childTitle: "Second Child",
    color: "red",
    plugNumber: "02",
    checkStatus: "O.K.",
    status: "active",
    syncRate: 78.6,
    mentalStability: 28,
    psychNotes: "Narcissistic defense mechanisms masking deep insecurity. Performance anxiety linked to maternal trauma. Sync rate in decline following Arael incident. Mental contamination risk: ELEVATED. Current trajectory unsustainable.",
    syncWave: { freqA: 0.045, freqB: 0.06, ampA: 50, ampB: 38, phaseA: 0.8, phaseB: 2.1 },
    combatLog: [
      { mission: "OP-GAGHIEL", date: "2015-07-14", result: "SUCCESS", syncRate: "82.3%" },
      { mission: "OP-ISRAFEL", date: "2015-08-20", result: "SUCCESS", syncRate: "91.0%" },
      { mission: "OP-ARAEL", date: "2015-12-05", result: "MENTAL CONTAM", syncRate: "12.4%" },
      { mission: "OP-MASS PROD", date: "2016-01-15", result: "UNIT DISABLED", syncRate: "0.0%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "78.6%", status: "ok" },
      { label: "STATUS", value: "ACTIVE", status: "ok" },
      { label: "CLEARANCE", value: "LEVEL-7", status: "ok" },
    ],
  },
  {
    id: "P-004",
    designation: "FIFTH CHILD",
    name: "KAWORU NAGISA",
    unit: "EVA-04",
    childTitle: "Fifth Child",
    color: "cyan",
    plugNumber: "04",
    checkStatus: "OFFLINE",
    status: "archived",
    syncRate: 99.9,
    mentalStability: 95,
    psychNotes: "SEELE designate. Anomalous psychological profile — subject displays impossible emotional equilibrium. No measurable anxiety, fear, or self-preservation instinct. AT Field signature: NON-HUMAN. Classification: ANGEL (TABRIS). Status: TERMINATED.",
    syncWave: { freqA: 0.03, freqB: 0.03, ampA: 60, ampB: 60, phaseA: 0, phaseB: 0 },
    combatLog: [
      { mission: "OP-TABRIS", date: "2016-01-01", result: "TERMINATED", syncRate: "99.9%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "99.9%", status: "ok" },
      { label: "STATUS", value: "TERMINATED", status: "critical" },
      { label: "CLEARANCE", value: "SEELE", status: "warning" },
    ],
  },
  {
    id: "P-005",
    designation: "UNKNOWN",
    name: "MARI ILLUSTRIOUS",
    unit: "EVA-08",
    childTitle: "Unknown",
    color: "green",
    plugNumber: "08",
    checkStatus: "O.K.",
    status: "active",
    syncRate: 85.3,
    mentalStability: 88,
    psychNotes: "Subject origin: CLASSIFIED (EURO-NERV). Abnormally stable psych profile for a pilot candidate. Displays genuine enthusiasm for EVA operation — unique among all Children. No maternal imprint detected in core. Background records sealed by order of [REDACTED].",
    syncWave: { freqA: 0.042, freqB: 0.058, ampA: 48, ampB: 42, phaseA: 0.5, phaseB: 1.8 },
    combatLog: [
      { mission: "OP-BETHANY", date: "2015-11-20", result: "SUCCESS", syncRate: "82.1%" },
      { mission: "OP-MASS PROD", date: "2016-01-15", result: "SUCCESS", syncRate: "87.6%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "85.3%", status: "ok" },
      { label: "STATUS", value: "ACTIVE", status: "ok" },
      { label: "CLEARANCE", value: "LEVEL-5", status: "warning" },
    ],
  },
  {
    id: "P-006",
    designation: "FOURTH CHILD",
    name: "TOJI SUZUHARA",
    unit: "EVA-03",
    childTitle: "Fourth Child",
    color: "orange",
    plugNumber: "03",
    checkStatus: "ERROR",
    status: "archived",
    syncRate: 33.7,
    mentalStability: 55,
    psychNotes: "Pilot selected under duress — sister's medical care leveraged as incentive. Initial sync test nominal. Unit-03 contaminated by 13th Angel (Bardiel) during transfer from Matsushiro. Pilot extracted via Dummy Plug override. Severe physical trauma — left leg amputated. PILOT STATUS: DISCHARGED.",
    syncWave: { freqA: 0.05, freqB: 0.07, ampA: 30, ampB: 20, phaseA: 1.2, phaseB: 2.5 },
    combatLog: [
      { mission: "OP-BARDIEL", date: "2015-10-10", result: "ANGEL CONTAM", syncRate: "33.7%" },
    ],
    fields: [
      { label: "SYNC RATE", value: "33.7%", status: "critical" },
      { label: "STATUS", value: "DISCHARGED", status: "critical" },
      { label: "CLEARANCE", value: "REVOKED", status: "critical" },
    ],
  },
];

const stabilityZones = [
  { start: 0, end: 25, color: "#FF0000", label: "CRITICAL" },
  { start: 25, end: 50, color: "#FF9900", label: "UNSTABLE" },
  { start: 50, end: 75, color: "#FFFF00", label: "GUARDED" },
  { start: 75, end: 100, color: "#00FF00", label: "STABLE" },
];

const breadcrumbItems = [
  { label: "NERV", href: "#" },
  { label: "PERSONNEL", href: "#" },
  { label: "PILOTS" },
];

const tabs = [
  { id: "active", label: "ACTIVE PILOTS" },
  { id: "archived", label: "ARCHIVED" },
];

// ─── Component ───

export default function PilotDossierPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedPilot, setSelectedPilot] = useState<string | null>(null);

  const filteredPilots = pilots.filter((p) =>
    activeTab === "active" ? p.status === "active" : p.status === "archived"
  );

  const activePilot = selectedPilot
    ? pilots.find((p) => p.id === selectedPilot)
    : null;

  return (
    <div className="min-h-screen bg-nerv-black">
      {/* ═══════ HEADER ═══════ */}
      <div className="border-b border-nerv-orange px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1
            className="text-xl sm:text-2xl uppercase tracking-[0.2em] text-nerv-orange font-bold"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            PILOT DOSSIER DATABASE
          </h1>
          <p className="text-[10px] font-mono text-nerv-white/50 mt-0.5">
            NERV HEADQUARTERS — PERSONNEL DIVISION — CLASSIFIED LEVEL-7
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-nerv-white/40 uppercase tracking-wider">
            REGISTERED PILOTS
          </span>
          <SegmentDisplay
            value={pilots.length}
            format="raw"
            digits={2}
            size="sm"
            color="orange"
          />
        </div>
      </div>

      {/* ═══════ BREADCRUMB ═══════ */}
      <div className="px-4 sm:px-6 py-2 border-b border-nerv-orange/20">
        <Breadcrumb items={breadcrumbItems} color="orange" />
      </div>

      {/* ═══════ NAVIGATION TABS ═══════ */}
      <div className="border-b border-nerv-orange/20">
        <NavigationTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(id) => {
            setActiveTab(id);
            setSelectedPilot(null);
          }}
          color="orange"
          className="px-4 sm:px-6"
        />
      </div>

      {/* ═══════ PILOT GRID ═══════ */}
      <div className="p-4 sm:p-6">
        <div
          className="text-xs uppercase tracking-[0.2em] text-nerv-orange font-bold mb-4"
          style={{ fontFamily: "var(--font-nerv-display)" }}
        >
          {activeTab === "active" ? "ACTIVE ROSTER" : "ARCHIVED PERSONNEL"} — {filteredPilots.length} RECORDS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPilots.map((pilot) => (
            <div
              key={pilot.id}
              className={`cursor-pointer transition-all duration-150 ${
                selectedPilot === pilot.id
                  ? "ring-1 ring-nerv-orange shadow-[0_0_12px_rgba(255,153,0,0.2)]"
                  : "hover:ring-1 hover:ring-nerv-white/20"
              }`}
              onClick={() => setSelectedPilot(selectedPilot === pilot.id ? null : pilot.id)}
            >
              <PilotCard
                designation={pilot.designation}
                name={pilot.name}
                unit={pilot.unit}
                fields={pilot.fields}
                plugNumber={pilot.plugNumber}
                checkStatus={pilot.checkStatus}
                color={pilot.color}
                animated={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════ PILOT DOSSIER DETAIL ═══════ */}
      {activePilot && (
        <div className="border-t border-nerv-orange/30 p-4 sm:p-6">
          <div
            className="text-xs uppercase tracking-[0.2em] text-nerv-cyan font-bold mb-4"
            style={{ fontFamily: "var(--font-nerv-display)" }}
          >
            DOSSIER: {activePilot.name} — {activePilot.unit} — {activePilot.designation}
          </div>

          <Accordion multiple className="mb-0">
            {/* ─── SYNC HISTORY ─── */}
            <AccordionItem id="sync" title="SYNC HISTORY" color="cyan">
              <div className="h-[200px]">
                <SyncRatioChart
                  title={`${activePilot.name} — NEURAL SYNC WAVEFORM`}
                  frequencyA={activePilot.syncWave.freqA}
                  frequencyB={activePilot.syncWave.freqB}
                  amplitudeA={activePilot.syncWave.ampA}
                  amplitudeB={activePilot.syncWave.ampB}
                  phaseA={activePilot.syncWave.phaseA}
                  phaseB={activePilot.syncWave.phaseB}
                  animated
                  className="h-full"
                />
              </div>
            </AccordionItem>

            {/* ─── PSYCHOLOGICAL EVALUATION ─── */}
            <AccordionItem id="psych" title="PSYCHOLOGICAL EVALUATION" color="orange">
              <div className="space-y-4">
                <GradientStatusBar
                  label="MENTAL STABILITY INDEX"
                  sublabel={`${activePilot.name} — CURRENT EVALUATION`}
                  value={activePilot.mentalStability}
                  min={0}
                  max={100}
                  zones={stabilityZones}
                  color={
                    activePilot.mentalStability < 25
                      ? "red"
                      : activePilot.mentalStability < 50
                        ? "orange"
                        : activePilot.mentalStability < 75
                          ? "orange"
                          : "green"
                  }
                />
                <Card title="EVALUATOR NOTES">
                  <p className="text-xs font-mono text-nerv-white/70 leading-relaxed">
                    {activePilot.psychNotes}
                  </p>
                  <div className="mt-3 pt-2 border-t border-nerv-mid-gray/30 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-nerv-white/30">
                      EVALUATOR: DR. RITSUKO AKAGI
                    </span>
                    <span className="text-[9px] font-mono text-nerv-white/30">
                      CLASSIFICATION: EYES ONLY
                    </span>
                  </div>
                </Card>
              </div>
            </AccordionItem>

            {/* ─── COMBAT RECORD ─── */}
            <AccordionItem id="combat" title="COMBAT RECORD" color="green">
              <DataGrid
                columns={[
                  { key: "mission", header: "OPERATION", width: "140px", sortable: true },
                  { key: "date", header: "DATE", width: "110px", sortable: true },
                  { key: "result", header: "RESULT", sortable: true },
                  { key: "syncRate", header: "SYNC RATE", width: "100px", align: "center", sortable: true },
                ]}
                data={activePilot.combatLog}
                color="green"
                title={`${activePilot.name} — SORTIE HISTORY`}
                showIndex
                pageSize={10}
                maxHeight="300px"
              />
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* ═══════ FOOTER ═══════ */}
      <div className="border-t border-nerv-white/10 px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
        <span className="text-[9px] font-mono text-nerv-white/30">
          NERV PERSONNEL DIVISION — PILOT DOSSIER SYSTEM v2.4.1
        </span>
        <span className="text-[9px] font-mono text-nerv-white/30">
          MAGI CLEARANCE: A-17 — DOCUMENT CLASS: CONFIDENTIAL
        </span>
      </div>
    </div>
  );
}
