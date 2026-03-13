"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HexGridBackground } from "@/components/HexGridBackground";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { Card } from "@/components/Card";
import { TargetingContainer } from "@/components/TargetingContainer";
import { BarChart } from "@/components/BarChart";
import { Gauge } from "@/components/Gauge";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-eva-black">
      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <HexGridBackground color="orange" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-6xl sm:text-7xl md:text-8xl text-eva-orange tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            EVA-UI
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs sm:text-sm uppercase tracking-[0.35em] text-eva-white/50 mb-6"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            NERV-GRADE REACT COMPONENT LIBRARY
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-eva-white/60 font-mono text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-8"
          >
            42 brutalist components inspired by the command interfaces of NERV
            headquarters
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center justify-center gap-4 flex-wrap mb-10"
          >
            <Link href="/docs">
              <Button variant="primary">VIEW COMPONENTS</Button>
            </Link>
            <Link href="/examples">
              <Button variant="ghost">EXPLORE EXAMPLES</Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <SegmentDisplay
              value={42}
              format="raw"
              digits={3}
              color="orange"
              label="COMPONENTS"
              size="lg"
            />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-eva-orange/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="border-t border-eva-orange py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-xl uppercase tracking-[0.25em] text-eva-orange font-bold text-center mb-3"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            DESIGN PRINCIPLES
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-eva-white/40 text-xs font-mono mb-12"
          >
            BRUTALIST INTERFACES FOR MISSION-CRITICAL APPLICATIONS
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "ZERO RADIUS",
                desc: "Sharp industrial angles, no rounded corners. Every element is cut with precision — brutalist geometry that commands attention.",
              },
              {
                title: "CRT AESTHETIC",
                desc: "Scanline overlays, LCD segment displays, and terminal typography. Interfaces that feel pulled from a retrofuture control room.",
              },
              {
                title: "MOTION READY",
                desc: "Framer Motion powered animations baked into every component. Smooth transitions, viewport triggers, and orchestrated sequences.",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={fadeUp} transition={{ duration: 0.5 }}>
                <Card title={feature.title}>
                  <p className="text-eva-white/70 font-mono text-xs leading-relaxed">
                    {feature.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ COMPONENT SHOWCASE ═══════ */}
      <section className="border-t border-eva-green/40 bg-eva-dark-gray/30 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-xl uppercase tracking-[0.25em] text-eva-green font-bold text-center mb-3"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            LIVE PREVIEW
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-eva-white/40 text-xs font-mono mb-12"
          >
            COMPONENTS RENDERED IN REAL-TIME
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <TargetingContainer label="COMPONENT ARRAY" color="green">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4">
                {/* Bar Chart */}
                <div className="col-span-full md:col-span-7">
                  <BarChart
                    title="MODULE READINESS"
                    direction="horizontal"
                    bars={[
                      { label: "LAYOUT", value: 100 },
                      { label: "DATA VIZ", value: 95 },
                      { label: "FORMS", value: 88 },
                      { label: "OVERLAYS", value: 92 },
                    ]}
                    unit="%"
                    color="green"
                  />
                </div>

                {/* Gauge */}
                <div className="col-span-full md:col-span-5 flex flex-col items-center justify-center gap-4">
                  <Gauge
                    value={96}
                    label="SYSTEM STATUS"
                    color="cyan"
                    size={160}
                    threshold={90}
                  />
                </div>

                {/* Badge row */}
                <div className="col-span-full flex flex-wrap items-center gap-3 pt-2">
                  <Badge label="REACT 18+" variant="info" size="sm" />
                  <Badge label="TYPESCRIPT" variant="success" size="sm" />
                  <Badge label="TAILWIND CSS" variant="default" size="sm" />
                  <Badge label="FRAMER MOTION" variant="warning" size="sm" />
                  <Badge label="ZERO DEPENDENCIES" variant="danger" size="sm" />
                </div>
              </div>
            </TargetingContainer>
          </motion.div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="border-y border-eva-orange bg-eva-dark-gray">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { value: "42", label: "COMPONENTS", color: "text-eva-orange" },
            { value: "6", label: "COLOR THEMES", color: "text-eva-cyan" },
            { value: "0px", label: "BORDER RADIUS", color: "text-eva-green" },
            { value: "MIT", label: "LICENSE", color: "text-eva-orange" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="px-6 py-8 md:border-r border-eva-orange/20 last:border-r-0 text-center"
            >
              <div
                className={`text-4xl md:text-5xl font-bold ${stat.color}`}
                style={{ fontFamily: "var(--font-eva-mono)" }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] text-eva-white/40 uppercase tracking-[0.2em] mt-2"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-2xl uppercase tracking-[0.25em] text-eva-green font-bold mb-4"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            INITIATE DEPLOYMENT
          </motion.h2>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-eva-dark-gray border border-eva-green/30 px-6 py-4 mb-8 inline-block"
          >
            <code
              className="text-eva-green text-sm sm:text-base font-mono"
            >
              npm install @mattloyed/eva-ui
            </code>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/docs">
              <Button variant="primary" size="lg">
                GET STARTED
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="border-t border-eva-white/10 py-12 px-6">
        <div className="text-center">
          <p
            className="text-[11px] text-eva-white/25 uppercase tracking-[0.3em] font-mono"
          >
            GOD&apos;S IN HIS HEAVEN. ALL&apos;S RIGHT WITH THE WORLD.
          </p>
        </div>
      </footer>
    </div>
  );
}
