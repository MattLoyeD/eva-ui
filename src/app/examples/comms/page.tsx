"use client";

import { useState, useRef, useEffect } from "react";
import { NavigationTabs } from "@/components/NavigationTabs";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { InputField } from "@/components/InputField";
import { PilotCard } from "@/components/PilotCard";

// ─── Types ───
interface Message {
  id: string;
  channel: string;
  sender: string;
  timestamp: string;
  text: string;
  classification: "OPEN" | "RESTRICTED" | "CLASSIFIED" | "EMERGENCY";
}

interface Operator {
  name: string;
  designation: string;
  unit: string;
  color: "orange" | "green" | "cyan" | "red";
  role: string;
  status: string;
}

// ─── Operator data ───
const operators: Record<string, Operator> = {
  MISATO: {
    name: "MISATO KATSURAGI",
    designation: "OPS.DIR",
    unit: "NERV-HQ",
    color: "red",
    role: "Operations Director",
    status: "ONLINE",
  },
  RITSUKO: {
    name: "RITSUKO AKAGI",
    designation: "SCI.DIR",
    unit: "MAGI-SYS",
    color: "cyan",
    role: "Chief Scientist",
    status: "ONLINE",
  },
  MAYA: {
    name: "MAYA IBUKI",
    designation: "TECH.1",
    unit: "BRIDGE-2",
    color: "green",
    role: "Systems Operator",
    status: "ONLINE",
  },
  HYUGA: {
    name: "MAKOTO HYUGA",
    designation: "TECH.2",
    unit: "BRIDGE-1",
    color: "orange",
    role: "Tactical Operator",
    status: "ONLINE",
  },
};

// ─── Channel definitions ───
const channels = [
  { id: "COMMAND", label: "COMMAND", icon: ">" },
  { id: "OPERATIONS", label: "OPERATIONS", icon: ">" },
  { id: "TECHNICAL", label: "TECHNICAL", icon: ">" },
  { id: "EMERGENCY", label: "EMERGENCY", icon: "!" },
];

// ─── Mock messages ───
const initialMessages: Message[] = [
  {
    id: "001",
    channel: "COMMAND",
    sender: "MISATO",
    timestamp: "08:12:33",
    text: "All units, status report. We have a possible Pattern Blue forming in Sector 7.",
    classification: "RESTRICTED",
  },
  {
    id: "002",
    channel: "COMMAND",
    sender: "HYUGA",
    timestamp: "08:12:58",
    text: "MAGI analysis underway. No confirmation yet. Wave pattern is irregular.",
    classification: "RESTRICTED",
  },
  {
    id: "003",
    channel: "TECHNICAL",
    sender: "RITSUKO",
    timestamp: "08:14:05",
    text: "MAGI Casper is flagging the waveform as 67.3% match to Blue pattern. Melchior disagrees.",
    classification: "OPEN",
  },
  {
    id: "004",
    channel: "TECHNICAL",
    sender: "MAYA",
    timestamp: "08:14:22",
    text: "Sempai, I'm seeing harmonics drift on EVA-01's S2 interface. Running diagnostics now.",
    classification: "OPEN",
  },
  {
    id: "005",
    channel: "COMMAND",
    sender: "MISATO",
    timestamp: "08:15:01",
    text: "Ritsuko, I need a definitive answer. Can we rule out an Angel?",
    classification: "RESTRICTED",
  },
  {
    id: "006",
    channel: "OPERATIONS",
    sender: "HYUGA",
    timestamp: "08:15:30",
    text: "Launching radar drones to Sector 7. ETA to visual confirmation: 4 minutes.",
    classification: "OPEN",
  },
  {
    id: "007",
    channel: "OPERATIONS",
    sender: "MAYA",
    timestamp: "08:16:12",
    text: "Entry plug pressure nominal across all units. Pilots on standby as ordered.",
    classification: "OPEN",
  },
  {
    id: "008",
    channel: "EMERGENCY",
    sender: "HYUGA",
    timestamp: "08:17:44",
    text: "PATTERN BLUE CONFIRMED. Repeat: PATTERN BLUE. Blood type analysis positive. Angel designation pending.",
    classification: "EMERGENCY",
  },
  {
    id: "009",
    channel: "EMERGENCY",
    sender: "MISATO",
    timestamp: "08:17:59",
    text: "ALL STATIONS CONDITION RED. Launch EVA-01 and EVA-02. Scramble intercept formation Delta.",
    classification: "EMERGENCY",
  },
  {
    id: "010",
    channel: "TECHNICAL",
    sender: "RITSUKO",
    timestamp: "08:18:10",
    text: "A.T. Field detected. Magnitude: Class 4. Recommend positron rifle deployment.",
    classification: "CLASSIFIED",
  },
];

// ─── Sender color map ───
const senderColorMap: Record<string, string> = {
  MISATO: "text-eva-red",
  RITSUKO: "text-eva-cyan",
  MAYA: "text-eva-green",
  HYUGA: "text-eva-orange",
};

const classificationStyles: Record<string, string> = {
  OPEN: "text-eva-green",
  RESTRICTED: "text-eva-orange",
  CLASSIFIED: "text-eva-red",
  EMERGENCY: "text-eva-red animate-pulse",
};

export default function CommsExample() {
  const [selectedChannel, setSelectedChannel] = useState("COMMAND");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeMessages = messages.filter((m) => m.channel === selectedChannel);

  const channelMessageCounts = channels.reduce(
    (acc, ch) => {
      acc[ch.id] = messages.filter((m) => m.channel === ch.id).length;
      return acc;
    },
    {} as Record<string, number>
  );

  // Find last sender in current channel to display in the operator panel
  const lastSender =
    activeMessages.length > 0
      ? operators[activeMessages[activeMessages.length - 1].sender]
      : operators.MISATO;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeMessages.length]);

  const handleSend = () => {
    if (!messageInput.trim()) {
      return;
    }

    const newMessage: Message = {
      id: String(messages.length + 1).padStart(3, "0"),
      channel: selectedChannel,
      sender: "MISATO",
      timestamp: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      text: messageInput.trim(),
      classification: selectedChannel === "EMERGENCY" ? "EMERGENCY" : "OPEN",
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessageInput("");
  };

  return (
    <div className="min-h-screen bg-eva-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-eva-orange px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1
              className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              NERV COMMS TERMINAL
            </h1>
            <p className="text-[10px] font-mono text-eva-white/50 mt-1">
              SECURE CHANNEL COMMUNICATIONS — AUTHORIZED PERSONNEL ONLY
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge label="ENCRYPTED" variant="success" size="sm" />
            <Badge label="LIVE" variant="danger" size="sm" />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0" style={{ minHeight: "600px" }}>
          {/* Left sidebar — channel list */}
          <div className="col-span-full md:col-span-3 border-r border-eva-orange/30">
            <div className="p-3 border-b border-eva-orange/20">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-eva-orange/60 font-bold"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                CHANNELS
              </span>
            </div>
            <NavigationTabs
              tabs={channels.map((ch) => ({
                id: ch.id,
                label: `${ch.label} (${channelMessageCounts[ch.id] || 0})`,
                icon: ch.icon,
              }))}
              activeTab={selectedChannel}
              onTabChange={setSelectedChannel}
              direction="vertical"
              color={selectedChannel === "EMERGENCY" ? "orange" : "green"}
            />

            {/* Channel info */}
            <div className="p-3 border-t border-eva-orange/20 mt-2">
              <TerminalDisplay
                lines={[
                  `ACTIVE: ${selectedChannel}`,
                  `MSGS: ${channelMessageCounts[selectedChannel] || 0}`,
                  `ENCRYPT: AES-256-GCM`,
                  `PROTO: NERV-SEC v4.2`,
                ]}
                color="green"
                title="CH. STATUS"
                maxHeight="120px"
              />
            </div>
          </div>

          {/* Center — message area */}
          <div className="col-span-full md:col-span-6 flex flex-col border-r border-eva-orange/30">
            {/* Channel header */}
            <div className="px-4 py-2 border-b border-eva-orange/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="text-xs uppercase tracking-[0.15em] text-eva-orange font-bold"
                  style={{ fontFamily: "var(--font-eva-display)" }}
                >
                  {selectedChannel}
                </span>
                <span className="text-[9px] font-mono text-eva-white/30">
                  {activeMessages.length} MESSAGES
                </span>
              </div>
              <Badge
                label={selectedChannel === "EMERGENCY" ? "PRIORITY 1" : "STANDARD"}
                variant={selectedChannel === "EMERGENCY" ? "danger" : "info"}
                size="sm"
              />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto max-h-[60vh] p-3 space-y-1">
              {activeMessages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <span className="text-eva-white/30 font-mono text-xs">
                    NO MESSAGES IN CHANNEL
                  </span>
                </div>
              )}

              {activeMessages.map((msg) => {
                const isEmergency = msg.classification === "EMERGENCY";

                return (
                  <div
                    key={msg.id}
                    className={`
                      p-2.5 border-l-2 font-mono text-xs
                      ${isEmergency
                        ? "border-eva-red bg-eva-red/5"
                        : "border-eva-white/10 hover:border-eva-white/30 hover:bg-eva-white/[0.02]"
                      }
                      transition-colors
                    `}
                  >
                    {/* Message header */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold ${senderColorMap[msg.sender] || "text-eva-white"}`}>
                        {msg.sender}
                      </span>
                      <span className="text-eva-white/20">|</span>
                      <span className="text-eva-cyan/60 text-[10px]">{msg.timestamp}</span>
                      <span className="text-eva-white/20">|</span>
                      <span className={`text-[9px] uppercase tracking-wider ${classificationStyles[msg.classification]}`}>
                        [{msg.classification}]
                      </span>
                    </div>

                    {/* Message body */}
                    <div className={`${isEmergency ? "text-eva-red font-bold" : "text-eva-white/80"}`}>
                      {isEmergency && <span className="mr-1">!!</span>}
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-eva-orange/20">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <InputField
                    placeholder="ENTER MESSAGE..."
                    color="green"
                    size="sm"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleSend}
                >
                  TRANSMIT
                </Button>
              </div>
              <div className="text-[9px] font-mono text-eva-white/30 mt-1.5">
                TRANSMITTING AS: KATSURAGI, MISATO — OPS.DIR — PRESS ENTER TO SEND
              </div>
            </div>
          </div>

          {/* Right sidebar — operator info + stats */}
          <div className="col-span-full md:col-span-3">
            <div className="p-3 border-b border-eva-orange/20">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-eva-orange/60 font-bold"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                ACTIVE OPERATOR
              </span>
            </div>

            {/* Operator pilot card */}
            <div className="p-3">
              {lastSender && (
                <PilotCard
                  designation={lastSender.designation}
                  name={lastSender.name}
                  unit={lastSender.unit}
                  color={lastSender.color}
                  plugNumber={lastSender.designation.split(".")[1] || "00"}
                  checkStatus="O.K."
                  fields={[
                    { label: "ROLE", value: lastSender.role, status: "ok" },
                    { label: "STATUS", value: lastSender.status, status: "ok" },
                  ]}
                />
              )}
            </div>

            {/* Connection stats */}
            <div className="p-3">
              <Card title="CONNECTION STATS">
                <div className="space-y-2 py-2">
                  {[
                    { label: "LATENCY", value: "12ms", color: "text-eva-green" },
                    { label: "UPTIME", value: "99.97%", color: "text-eva-green" },
                    { label: "ENCRYPTION", value: "AES-256", color: "text-eva-cyan" },
                    { label: "OPERATORS", value: `${Object.keys(operators).length} ONLINE`, color: "text-eva-orange" },
                    { label: "TOTAL MSGS", value: String(messages.length), color: "text-eva-white/70" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-eva-white/40 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${stat.color}`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Online operators list */}
            <div className="p-3 border-t border-eva-orange/20">
              <span
                className="text-[10px] uppercase tracking-[0.2em] text-eva-orange/60 font-bold block mb-2"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                ONLINE OPERATORS
              </span>
              <div className="space-y-1.5">
                {Object.entries(operators).map(([key, op]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 text-[10px] font-mono"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-eva-green`} />
                    <span className={senderColorMap[key] || "text-eva-white/60"}>
                      {op.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
