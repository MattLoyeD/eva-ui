"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HexGridBackground } from "@/components/HexGridBackground";
import { SegmentDisplay } from "@/components/SegmentDisplay";
import { StatusStamp } from "@/components/StatusStamp";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

export default function Error404Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-eva-black overflow-hidden">
      {/* Hex grid backdrop */}
      <HexGridBackground opacity={0.06} animated className="absolute inset-0 z-0" />

      {/* Main centered content */}
      <div className="flex-1 flex items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-lg w-full"
        >
          {/* 404 segment display */}
          <SegmentDisplay
            value={404}
            format="raw"
            digits={3}
            color="red"
            size="xl"
            label="ERROR CODE"
          />

          {/* Status stamp */}
          <StatusStamp
            text="SIGNAL LOST"
            color="red"
            bordered
            rotation={-8}
            visible
          />

          {/* Description text */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p
              className="text-eva-orange text-sm uppercase tracking-wider font-bold"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              DESIGNATED ROUTE NOT FOUND
            </p>
            <p className="text-eva-mid-gray text-xs leading-relaxed max-w-sm">
              The requested resource could not be located within NERV systems.
            </p>
          </div>

          {/* Divider */}
          <Divider color="orange" variant="dashed" className="w-full" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link href="/examples">
              <Button variant="primary" size="md">
                RETURN TO BASE
              </Button>
            </Link>
            <Button variant="ghost" size="md">
              REPORT ANOMALY
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom emergency banner */}
      <div className="z-10">
        <EmergencyBanner
          severity="info"
          text="ROUTE ERROR"
          subtext="NAVIGATION SYSTEM OFFLINE"
          visible
        />
      </div>
    </div>
  );
}
