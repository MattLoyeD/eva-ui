"use client";

import { useState } from "react";
import { HexGridBackground } from "@/components/HexGridBackground";
import { InputField } from "@/components/InputField";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { StatusStamp } from "@/components/StatusStamp";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";

export default function LoginExample() {
  const [operatorId, setOperatorId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showClassified, setShowClassified] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowClassified(true);
      setTimeout(() => {
        setShowClassified(false);
        setAuthenticated(true);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-eva-black flex flex-col items-center justify-center">
      {/* Hex grid backdrop */}
      <HexGridBackground className="absolute inset-0 opacity-20" />

      {/* Classified overlay flash */}
      {showClassified && (
        <ClassifiedOverlay
          text="ACCESS GRANTED"
          isUnlocked={false}
          className="fixed inset-0 z-50"
        />
      )}

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {authenticated ? (
          <div className="border border-eva-green/30 bg-eva-black/80 p-8">
            <StatusStamp
              text="ACCESS GRANTED"
              color="green"
              bordered
              rotation={-8}
              subtitle="CLEARANCE VERIFIED"
            />
            <div className="text-center mt-6">
              <p className="text-eva-green font-mono text-xs uppercase tracking-wider">
                Welcome, Operator {operatorId || "UNKNOWN"}
              </p>
              <p className="text-eva-mid-gray font-mono text-[10px] mt-2">
                SESSION INITIALIZED — MAGI AUTHENTICATION COMPLETE
              </p>
              <Button
                variant="ghost"
                className="mt-6"
                onClick={() => {
                  setAuthenticated(false);
                  setOperatorId("");
                  setAccessCode("");
                  setRemember(false);
                }}
              >
                DISCONNECT
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-eva-orange/30 bg-eva-black/80">
            {/* NERV header */}
            <div className="border-b border-eva-orange/30 px-6 py-6 text-center">
              <h1
                className="text-5xl font-black uppercase tracking-[0.3em] text-eva-orange"
                style={{ fontFamily: "var(--font-eva-display)" }}
              >
                NERV
              </h1>
              <p className="text-[10px] font-mono text-eva-mid-gray mt-2 tracking-[0.25em]">
                PERSONNEL ACCESS TERMINAL
              </p>
            </div>

            {/* Form body */}
            <div className="px-6 py-6 space-y-5">
              <Divider label="AUTHENTICATION REQUIRED" color="orange" />

              <InputField
                label="OPERATOR ID"
                placeholder="Enter operator ID..."
                color="orange"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
              />

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-eva-orange mb-1.5">
                  ACCESS CODE
                </label>
                <input
                  type="password"
                  placeholder="Enter access code..."
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-transparent border border-eva-orange/40 text-eva-white font-mono text-sm px-3 py-2 placeholder:text-eva-mid-gray/40 focus:border-eva-orange focus:outline-none transition-colors"
                />
              </div>

              <Checkbox
                label="REMEMBER THIS TERMINAL"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                color="orange"
              />

              <Button
                variant="primary"
                onClick={handleLogin}
                loading={loading}
                className="w-full"
              >
                AUTHENTICATE
              </Button>

              <div className="flex items-center justify-between">
                <button className="text-[10px] font-mono text-eva-mid-gray hover:text-eva-orange transition-colors uppercase tracking-wider">
                  Forgot access code?
                </button>
                <button className="text-[10px] font-mono text-eva-mid-gray hover:text-eva-orange transition-colors uppercase tracking-wider">
                  Request clearance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer text */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-[10px] font-mono text-eva-mid-gray/50 uppercase tracking-[0.2em]">
          NERV HEADQUARTERS — GEOFRONT LEVEL 02
        </p>
      </div>
    </div>
  );
}
