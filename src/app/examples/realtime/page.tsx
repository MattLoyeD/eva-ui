"use client";

import { useState, useEffect } from "react";
import { SyncRatioChart } from "@/components/SyncRatioChart";
import { SyncProgressBar } from "@/components/SyncProgressBar";
import { CountdownTimer } from "@/components/CountdownTimer";
import { DataGrid } from "@/components/DataGrid";
import { TargetingContainer } from "@/components/TargetingContainer";
import { EmergencyBanner } from "@/components/EmergencyBanner";

// ─── Simulated sensor data ───
const sensorNames = ["THERMAL", "PRESSURE", "RADIATION", "EM-FIELD", "BIO-METRIC"];

const initialEvents = [
  { time: "14:30:00.000", sensor: "THERMAL", value: "312.4", status: "NOMINAL" },
  { time: "14:30:01.102", sensor: "PRESSURE", value: "1.02", status: "NOMINAL" },
  { time: "14:30:02.445", sensor: "RADIATION", value: "0.03", status: "LOW" },
];

export default function RealtimeDashboard() {
  const [sensorValues, setSensorValues] = useState([72, 45, 88, 33, 61]);
  const [events, setEvents] = useState(initialEvents);
  const [tick, setTick] = useState(0);

  // ─── Fluctuate sensor values ───
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues((prev) =>
        prev.map((v) =>
          Math.max(5, Math.min(99, v + (Math.random() - 0.5) * 8))
        )
      );
      setTick((t) => t + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // ─── Accumulate events ───
  useEffect(() => {
    if (tick === 0 || tick > 15) return;
    const statuses = ["NOMINAL", "WARNING", "CRITICAL", "LOW"];
    const newEvent = {
      time: `14:30:${String(tick * 2).padStart(2, "0")}.${String(Math.floor(Math.random() * 999)).padStart(3, "0")}`,
      sensor: sensorNames[Math.floor(Math.random() * sensorNames.length)],
      value: (Math.random() * 500).toFixed(1),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
    setEvents((prev) => [...prev, newEvent]);
  }, [tick]);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Header */}
      <div className="border-b border-eva-green px-6 py-3">
        <h1
          className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          REAL-TIME MONITORING STATION
        </h1>
        <p className="text-[10px] font-mono text-eva-mid-gray mt-1">
          LIVE SENSOR FEEDS — NERV GEOFRONT — LEVEL B-06
        </p>
      </div>

      {/* Alert bar */}
      {tick > 10 && (
        <EmergencyBanner
          text="ANOMALY DETECTED"
          subtext="SENSOR READINGS EXCEEDING THRESHOLD — INVESTIGATION REQUIRED"
          visible
          severity="warning"
        />
      )}

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-0">
        {/* Left: Sensor Bars */}
        <div className="col-span-3 border-r border-eva-green p-4">
          <h2
            className="text-xs uppercase tracking-[0.2em] text-eva-orange font-bold mb-4"
            style={{ fontFamily: "var(--font-eva-display)" }}
          >
            SENSOR ARRAY
          </h2>
          <div className="space-y-4">
            {sensorNames.map((name, i) => (
              <div key={name} className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-eva-mid-gray">
                  <span>{name}</span>
                  <span className="text-eva-cyan">
                    {sensorValues[i].toFixed(1)}%
                  </span>
                </div>
                <SyncProgressBar
                  value={sensorValues[i]}
                  label={name}
                  blocks={12}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-eva-mid-gray/30 pt-4">
            <CountdownTimer initialSeconds={600} />
          </div>
        </div>

        {/* Center: Dual waveforms */}
        <div className="col-span-5 flex flex-col">
          <TargetingContainer label="WAVEFORM A — PRIMARY" color="cyan">
            <div style={{ height: "200px" }}>
              <SyncRatioChart
                showGrid
                animated
                frequencyA={0.04}
                frequencyB={0.06}
                speed={1.5}
              />
            </div>
          </TargetingContainer>

          <TargetingContainer label="WAVEFORM B — SECONDARY" color="orange">
            <div style={{ height: "200px" }}>
              <SyncRatioChart
                showGrid
                animated
                frequencyA={0.08}
                frequencyB={0.12}
                amplitudeA={35}
                amplitudeB={25}
                speed={2}
              />
            </div>
          </TargetingContainer>
        </div>

        {/* Right: Event feed */}
        <div className="col-span-4 border-l border-eva-green">
          <DataGrid
            columns={[
              { key: "time", header: "TIME", width: "120px", sortable: true },
              { key: "sensor", header: "SENSOR", sortable: true },
              { key: "value", header: "VALUE", align: "right", sortable: true, type: "float" },
              { key: "status", header: "STATUS", align: "center", sortable: true },
            ]}
            data={events}
            color="green"
            title="LIVE EVENT FEED"
            showIndex
            pageSize={8}
            maxHeight="500px"
          />
        </div>
      </div>
    </div>
  );
}
