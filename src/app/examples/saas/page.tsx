"use client";

import { useState } from "react";
import { EvaTitleScreen } from "@/components/EvaTitleScreen";
import { HexGridBackground } from "@/components/HexGridBackground";
import { TargetingContainer } from "@/components/TargetingContainer";
import { DataGrid } from "@/components/DataGrid";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/Button";
import { SystemDialog } from "@/components/SystemDialog";
import { SeeleMonolith } from "@/components/SeeleMonolith";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { SyncProgressBar } from "@/components/SyncProgressBar";

export default function SaasLandingPage() {
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative h-[500px] overflow-hidden">
        <HexGridBackground color="green" />
        <div className="absolute inset-0 z-10">
          <EvaTitleScreen
            title="GENESIS"
            subtitle="NEURAL INTERFACE PLATFORM"
            align="center"
            className="!min-h-0 !h-full"
          />
        </div>
        <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
          <p
            className="text-eva-mid-gray font-mono text-sm uppercase tracking-[0.3em]"
          >
            NEXT-GENERATION ROBOTICS &amp; GENOMICS INFRASTRUCTURE
          </p>
        </div>
      </section>

      {/* ═══════ METRICS BAR ═══════ */}
      <section className="border-y border-eva-orange bg-eva-dark-gray">
        <div className="max-w-6xl mx-auto grid grid-cols-4 gap-0">
          {[
            { label: "NEURAL THROUGHPUT", value: "94.7%", color: "green" as const },
            { label: "SYNC LATENCY", value: "0.3ms", color: "cyan" as const },
            { label: "GENOME SEQUENCES", value: "12.4M", color: "orange" as const },
            { label: "UPTIME", value: "99.99%", color: "green" as const },
          ].map((metric) => (
            <div
              key={metric.label}
              className="px-6 py-4 border-r border-eva-orange/20 last:border-r-0 text-center"
            >
              <div
                className={`text-2xl font-bold text-eva-${metric.color}`}
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {metric.value}
              </div>
              <div
                className="text-[10px] text-eva-mid-gray uppercase tracking-[0.15em] mt-1"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2
          className="text-xl uppercase tracking-[0.2em] text-eva-orange font-bold text-center mb-8"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          CORE CAPABILITIES
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <TargetingContainer label="NEURAL SYNC ENGINE" color="cyan">
            <div className="p-6 space-y-3">
              <div style={{ height: "120px" }}>
                <SyncRatioChart
                  showGrid
                  animated
                  speed={2}
                  frequencyA={0.06}
                  frequencyB={0.09}
                />
              </div>
              <p className="text-eva-white text-xs font-mono leading-relaxed">
                Real-time neural pattern synchronization with sub-millisecond
                latency. Bio-compatible interface for direct cortex-to-machine
                communication.
              </p>
            </div>
          </TargetingContainer>

          <TargetingContainer label="GENOME PROCESSOR" color="green">
            <div className="p-6 space-y-3">
              <div className="space-y-2">
                {["DNA SEQUENCING", "PROTEIN FOLDING", "GENE EXPRESSION", "MUTATION ANALYSIS"].map(
                  (item, i) => (
                    <SyncProgressBar
                      key={item}
                      value={[92, 78, 85, 63][i]}
                      label={item}
                      blocks={10}
                    />
                  )
                )}
              </div>
              <p className="text-eva-white text-xs font-mono leading-relaxed">
                Massively parallel genomic analysis powered by quantum-biological
                compute clusters. Process 12.4M sequences per cycle.
              </p>
            </div>
          </TargetingContainer>

          <TargetingContainer label="A.T. FIELD SECURITY" color="orange">
            <div className="p-6 space-y-3">
              <div className="space-y-2 text-[10px] font-mono">
                {[
                  { name: "PERIMETER SHIELD", status: "ACTIVE", color: "text-eva-green" },
                  { name: "DATA ENCRYPTION", status: "AES-256", color: "text-eva-cyan" },
                  { name: "INTRUSION DETECT", status: "ARMED", color: "text-eva-green" },
                  { name: "BIO-AUTH LAYER", status: "ENABLED", color: "text-eva-orange" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between py-1 border-b border-eva-mid-gray/20"
                  >
                    <span className="text-eva-white">{item.name}</span>
                    <span className={item.color}>{item.status}</span>
                  </div>
                ))}
              </div>
              <p className="text-eva-white text-xs font-mono leading-relaxed">
                Multi-layered defensive architecture inspired by Absolute Terror
                Field technology. Zero-breach guarantee.
              </p>
            </div>
          </TargetingContainer>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section className="border-t border-eva-orange py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-xl uppercase tracking-[0.2em] text-eva-orange font-bold text-center mb-8"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            DEPLOYMENT TIERS
          </h2>

          <DataGrid
            columns={[
              { key: "tier", header: "TIER", sortable: true },
              { key: "nodes", header: "COMPUTE NODES", align: "center", sortable: true, type: "int" },
              { key: "storage", header: "STORAGE", align: "center" },
              { key: "sync", header: "SYNC RATE", align: "center" },
              { key: "price", header: "COST/MO", align: "right", sortable: true, type: "int" },
            ]}
            data={[
              { tier: "PROTOTYPE", nodes: 4, storage: "1 TB", sync: "60 Hz", price: 499 },
              { tier: "PRODUCTION", nodes: 16, storage: "10 TB", sync: "120 Hz", price: 1999 },
              { tier: "ENTERPRISE", nodes: 64, storage: "100 TB", sync: "240 Hz", price: 7999 },
              { tier: "NERV-CLASS", nodes: 256, storage: "1 PB", sync: "∞", price: 29999 },
            ]}
            color="orange"
            title="PRICING MATRIX"
          />
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="border-t border-eva-green py-12 px-6 bg-eva-dark-gray">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2
            className="text-xl uppercase tracking-[0.2em] text-eva-green font-bold"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            REQUEST ACCESS
          </h2>
          <p className="text-eva-mid-gray font-mono text-xs">
            ENTER YOUR CREDENTIALS TO REQUEST A DEPLOYMENT KEY
          </p>

          {submitted ? (
            <div className="py-8">
              <div className="text-eva-green font-mono text-sm uppercase tracking-wider">
                ✓ ACCESS REQUEST TRANSMITTED
              </div>
              <div className="text-eva-mid-gray font-mono text-[10px] mt-2">
                MAGI VERIFICATION IN PROGRESS — EXPECT RESPONSE WITHIN 24H
              </div>
            </div>
          ) : (
            <div className="flex gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <InputField
                  label="CONTACT ID"
                  placeholder="operator@nerv.gov"
                  color="green"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="pt-5">
                <Button
                  variant="primary"
                  onClick={() => {
                    if (email.trim()) setShowDialog(true);
                  }}
                >
                  DEPLOY
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-eva-mid-gray/30 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-4 mb-6">
            <SeeleMonolith id="01" isSpeaking={false} className="w-24 min-h-[60px]" />
            <SeeleMonolith id="02" isSpeaking={false} className="w-24 min-h-[60px]" />
            <SeeleMonolith id="03" isSpeaking={false} className="w-24 min-h-[60px]" />
          </div>
          <div className="text-center text-[10px] font-mono text-eva-mid-gray/50 space-y-1">
            <div>GENESIS PLATFORM — A DIVISION OF NERV</div>
            <div>BUILT WITH EVAUI — TOKYO-3, JAPAN</div>
            <div>© 2015 GEHIRN CORP. ALL RIGHTS RESERVED.</div>
          </div>
        </div>
      </footer>

      {/* Confirmation Dialog */}
      <SystemDialog
        open={showDialog}
        title="CONFIRM DEPLOYMENT REQUEST"
        severity="normal"
        acceptText="TRANSMIT"
        declineText="CANCEL"
        onAccept={() => {
          setShowDialog(false);
          setSubmitted(true);
        }}
        onDecline={() => setShowDialog(false)}
        onClose={() => setShowDialog(false)}
      >
        <div className="text-eva-white font-mono text-sm space-y-2">
          <p>
            Requesting deployment key for:{" "}
            <span className="text-eva-cyan">{email}</span>
          </p>
          <p className="text-eva-mid-gray text-xs">
            Your request will be verified by MAGI consensus protocol.
          </p>
        </div>
      </SystemDialog>
    </div>
  );
}
