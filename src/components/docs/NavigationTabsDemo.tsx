"use client";

import { useState } from "react";
import { NavigationTabs } from "@/components/NavigationTabs";

export function NavigationTabsHorizontalDemo() {
  const [activeTab, setActiveTab] = useState("ops");
  return (
    <NavigationTabs
      tabs={[
        { id: "ops", label: "OPERATIONS" },
        { id: "intel", label: "INTELLIGENCE" },
        { id: "magi", label: "MAGI SYSTEM", icon: "◆" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      color="orange"
    />
  );
}

export function NavigationTabsVerticalDemo() {
  const [activeTab, setActiveTab] = useState("status");
  return (
    <NavigationTabs
      tabs={[
        { id: "status", label: "STATUS" },
        { id: "sync", label: "SYNC DATA" },
        { id: "comms", label: "COMMUNICATIONS" },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      direction="vertical"
      color="green"
    />
  );
}

export function NavigationTabsCyanDemo() {
  const [activeTab, setActiveTab] = useState("primary");
  return (
    <NavigationTabs
      tabs={[
        { id: "primary", label: "PRIMARY" },
        { id: "secondary", label: "SECONDARY" },
        { id: "backup", label: "BACKUP", disabled: true },
      ]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      color="cyan"
    />
  );
}
