"use client";

import { useState } from "react";
import Link from "next/link";
import { HexGridBackground } from "@/components/HexGridBackground";
import { InputField } from "@/components/InputField";
import { SelectMenu } from "@/components/SelectMenu";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";

const departmentOptions = [
  { value: "operations", label: "OPERATIONS" },
  { value: "technical", label: "TECHNICAL" },
  { value: "science", label: "SCIENCE" },
  { value: "command", label: "COMMAND" },
  { value: "medical", label: "MEDICAL" },
];

const clearanceOptions = [
  { value: "1", label: "LEVEL 1" },
  { value: "2", label: "LEVEL 2" },
  { value: "3", label: "LEVEL 3" },
  { value: "4", label: "LEVEL 4" },
];

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [operatorId, setOperatorId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [clearance, setClearance] = useState("");
  const [acceptCode, setAcceptCode] = useState(false);
  const [acceptClassification, setAcceptClassification] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-eva-black flex flex-col items-center justify-center py-8">
      <HexGridBackground className="absolute inset-0 opacity-20" />

      {/* Registration card */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4">
        <div className="border border-eva-orange/30 bg-eva-black/80">
          {/* Header */}
          <div className="border-b border-eva-orange/30 px-6 py-6 text-center">
            <h1
              className="text-5xl font-black uppercase tracking-[0.3em] text-eva-orange"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              NERV
            </h1>
            <p className="text-[10px] font-mono text-eva-mid-gray mt-2 tracking-[0.25em]">
              NEW PERSONNEL REGISTRATION
            </p>
          </div>

          {/* Form body */}
          <div className="px-6 py-6 space-y-5">
            <Divider label="IDENTITY VERIFICATION" color="orange" />

            {/* Name fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="FIRST NAME"
                placeholder="Enter first name..."
                color="orange"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField
                label="LAST NAME"
                placeholder="Enter last name..."
                color="orange"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <InputField
              label="OPERATOR ID"
              placeholder="Enter operator ID..."
              color="orange"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
            />

            <InputField
              label="EMAIL ADDRESS"
              placeholder="Enter email address..."
              color="orange"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password fields */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-eva-orange mb-1.5">
                ACCESS CODE
              </label>
              <input
                type="password"
                placeholder="Enter access code..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-eva-orange/40 text-eva-white font-mono text-sm px-3 py-2 placeholder:text-eva-mid-gray/40 focus:border-eva-orange focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-eva-orange mb-1.5">
                CONFIRM ACCESS CODE
              </label>
              <input
                type="password"
                placeholder="Confirm access code..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border border-eva-orange/40 text-eva-white font-mono text-sm px-3 py-2 placeholder:text-eva-mid-gray/40 focus:border-eva-orange focus:outline-none transition-colors"
              />
            </div>

            {/* Selects */}
            <SelectMenu
              label="DEPARTMENT"
              options={departmentOptions}
              placeholder="SELECT DEPARTMENT..."
              color="orange"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />

            <SelectMenu
              label="CLEARANCE LEVEL"
              options={clearanceOptions}
              placeholder="SELECT CLEARANCE..."
              color="orange"
              value={clearance}
              onChange={(e) => setClearance(e.target.value)}
            />

            {/* Checkboxes */}
            <Checkbox
              label="I accept the NERV Personnel Code of Conduct"
              checked={acceptCode}
              onChange={(e) => setAcceptCode(e.target.checked)}
              color="orange"
            />

            <Checkbox
              label="I acknowledge classification protocols"
              checked={acceptClassification}
              onChange={(e) => setAcceptClassification(e.target.checked)}
              color="orange"
            />

            {/* Submit */}
            <Button
              variant="primary"
              onClick={handleRegister}
              loading={loading}
              className="w-full"
            >
              REGISTER
            </Button>

            {/* Login link */}
            <div className="text-center">
              <p className="text-[10px] font-mono text-eva-mid-gray">
                Already registered?{" "}
                <Link
                  href="/examples/auth/login"
                  className="text-eva-orange hover:underline"
                >
                  Access terminal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-center">
        <p className="text-[10px] font-mono text-eva-mid-gray/50 uppercase tracking-[0.2em]">
          NERV HEADQUARTERS — REGISTRATION DIVISION
        </p>
      </div>
    </div>
  );
}
