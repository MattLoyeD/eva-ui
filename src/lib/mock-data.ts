// Mock data for the NERV Command Center dashboard

export const systemLogs = [
  { time: "14:32:07", level: "INFO", source: "MAGI-01", message: "Core system initialization complete" },
  { time: "14:32:08", level: "INFO", source: "MAGI-02", message: "Pattern blue confirmed — all sectors" },
  { time: "14:32:09", level: "WARN", source: "MELCHIOR", message: "A.T. Field detection threshold adjusted" },
  { time: "14:32:10", level: "INFO", source: "BALTHASAR", message: "Synchronization rate nominal" },
  { time: "14:32:11", level: "INFO", source: "CASPER", message: "NERV HQ perimeter secure" },
  { time: "14:32:12", level: "ERROR", source: "PRIBNOW", message: "LCL pressure anomaly in Cage 7" },
  { time: "14:32:13", level: "INFO", source: "MAGI-01", message: "Entry plug telemetry online" },
  { time: "14:32:14", level: "WARN", source: "MAGI-02", message: "Type-B equipment compatibility warning" },
  { time: "14:32:15", level: "INFO", source: "MELCHIOR", message: "Geofront structural integrity 99.7%" },
  { time: "14:32:16", level: "INFO", source: "BALTHASAR", message: "Eva Unit-01 — standby mode confirmed" },
  { time: "14:32:17", level: "INFO", source: "CASPER", message: "Pilot vitals within acceptable parameters" },
  { time: "14:32:18", level: "WARN", source: "PRIBNOW", message: "Harmonics test deviation +0.3%" },
  { time: "14:32:19", level: "INFO", source: "MAGI-01", message: "External sensor array calibrated" },
  { time: "14:32:20", level: "INFO", source: "MAGI-02", message: "N2 mine reserves at 94.2%" },
  { time: "14:32:21", level: "ERROR", source: "MELCHIOR", message: "Unidentified waveform in sector 7G" },
  { time: "14:32:22", level: "INFO", source: "BALTHASAR", message: "Dummy plug system on standby" },
  { time: "14:32:23", level: "INFO", source: "CASPER", message: "Communications relay operational" },
  { time: "14:32:24", level: "INFO", source: "MAGI-01", message: "All personnel accounted for" },
];

export const terminalLines = [
  "MAGI SUPERCOMPUTER SYSTEM v3.02.1",
  "═══════════════════════════════════",
  "",
  "MELCHIOR-1 .... ONLINE  [OK]",
  "BALTHASAR-2 ... ONLINE  [OK]",
  "CASPER-3 ...... ONLINE  [OK]",
  "",
  "> Initializing pattern analysis...",
  "> Loading A.T. Field frequency database...",
  "> Synchronization monitoring active",
  "> Geofront defense grid: ARMED",
  "",
  "STATUS: ALL SYSTEMS OPERATIONAL",
  "ALERT LEVEL: STANDARD",
  "NEXT SCHEDULED TEST: 2015-06-22 09:00:00",
  "",
  "> Awaiting command input_",
];

export const pilotSyncData = [
  { pilot: "IKARI, S.", unit: "EVA-01", sync: 41.3, status: "STANDBY" },
  { pilot: "SORYU, A.", unit: "EVA-02", sync: 67.8, status: "ACTIVE" },
  { pilot: "AYANAMI, R.", unit: "EVA-00", sync: 55.2, status: "STANDBY" },
  { pilot: "SUZUHARA, T.", unit: "EVA-03", sync: 12.1, status: "OFFLINE" },
  { pilot: "NAGISA, K.", unit: "EVA-06", sync: 99.9, status: "RESTRICTED" },
];
