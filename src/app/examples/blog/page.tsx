"use client";

import { useState } from "react";
import { NavigationTabs } from "@/components/NavigationTabs";
import { TerminalDisplay } from "@/components/TerminalDisplay";
import { ClassifiedOverlay } from "@/components/ClassifiedOverlay";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Button } from "@/components/Button";
import { DataGrid } from "@/components/DataGrid";

// ─── Blog post data ───
interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  classified: boolean;
  breaking: boolean;
  content: string[];
}

const posts: Post[] = [
  {
    id: "001",
    title: "ANGEL ENCOUNTER — AFTER ACTION REPORT",
    category: "REPORTS",
    date: "2015-06-22",
    classified: false,
    breaking: true,
    content: [
      "SUBJECT: THIRD ANGEL ENCOUNTER — SACHIEL",
      "═══════════════════════════════════════",
      "DATE: 2015-06-22 | LOCATION: TOKYO-3",
      "",
      "At 1432 hours, a Pattern Blue was detected",
      "approaching from the Pacific basin.",
      "",
      "EVA-01 was deployed with pilot IKARI SHINJI.",
      "Initial sync rate: 41.5% (below threshold).",
      "",
      "A.T. Field neutralization: SUCCESSFUL",
      "Core breach: CONFIRMED",
      "Angel designation: ELIMINATED",
      "",
      "CASUALTIES: 0 (NERV), 14 (civilian)",
      "DAMAGE: Sectors 3-7 (moderate)",
      "STATUS: RESOLVED",
    ],
  },
  {
    id: "002",
    title: "MAGI SYSTEM ARCHITECTURE OVERVIEW",
    category: "TECHNICAL",
    date: "2015-05-10",
    classified: false,
    breaking: false,
    content: [
      "MAGI SUPERCOMPUTER — TECHNICAL BRIEF",
      "═══════════════════════════════════════",
      "",
      "The MAGI system comprises three independent",
      "supercomputers representing aspects of its",
      "creator, Dr. Naoko Akagi:",
      "",
      "MELCHIOR-1 — The Scientist",
      "BALTHASAR-2 — The Mother",
      "CASPER-3 — The Woman",
      "",
      "Decision protocol: 2/3 majority consensus",
      "Processing: Bio-neural quantum architecture",
      "Uptime: 99.9997% since initialization",
      "",
      "NOTE: System personality matrices are",
      "based on actual human brain patterns.",
    ],
  },
  {
    id: "003",
    title: "DEAD SEA SCROLLS — PROPHECY ANALYSIS",
    category: "CLASSIFIED",
    date: "2015-04-01",
    classified: true,
    breaking: false,
    content: [
      "DEAD SEA SCROLLS — SECTION 7A",
      "═══════════════════════════════════════",
      "CLASSIFICATION: EYES ONLY — SEELE",
      "",
      "[CONTENT DECRYPTION IN PROGRESS]",
      "",
      "The scrolls describe the sequence of",
      "seventeen Angels and the conditions",
      "for [REDACTED].",
      "",
      "Third Impact scenario probability:",
      "COMPUTATION: ████████ 73.2%",
      "",
      "HUMAN INSTRUMENTALITY PROJECT",
      "STATUS: [REDACTED]",
      "AUTHORIZATION: SEELE-01 ONLY",
    ],
  },
  {
    id: "004",
    title: "EVA PILOT PSYCHOLOGICAL EVALUATION",
    category: "REPORTS",
    date: "2015-06-15",
    classified: true,
    breaking: false,
    content: [
      "PILOT EVALUATION — QUARTERLY REVIEW",
      "═══════════════════════════════════════",
      "EVALUATOR: Dr. Ritsuko Akagi",
      "",
      "IKARI SHINJI (EVA-01):",
      "  Sync deviation: -12% (declining)",
      "  Psychological state: [REDACTED]",
      "  Recommendation: CONTINUED MONITORING",
      "",
      "AYANAMI REI (EVA-00):",
      "  Sync deviation: +3% (stable)",
      "  Psychological state: [REDACTED]",
      "  Recommendation: CLEARED FOR DUTY",
      "",
      "SORYU ASUKA (EVA-02):",
      "  Sync deviation: +8% (improving)",
      "  Psychological state: COMPETITIVE",
      "  Recommendation: CLEARED FOR DUTY",
    ],
  },
  {
    id: "005",
    title: "EVANGELION MAINTENANCE SCHEDULE Q3",
    category: "TECHNICAL",
    date: "2015-07-01",
    classified: false,
    breaking: false,
    content: [
      "MAINTENANCE SCHEDULE — Q3 2015",
      "═══════════════════════════════════════",
      "",
      "EVA-00: LCL refresh, armor plating R&R",
      "  Scheduled: 2015-07-15",
      "  Duration: 72 hours",
      "",
      "EVA-01: Progressive knife replacement",
      "  Scheduled: 2015-08-01",
      "  Duration: 48 hours",
      "",
      "EVA-02: Full diagnostic, sync calibration",
      "  Scheduled: 2015-07-22",
      "  Duration: 96 hours",
      "",
      "ALL UNITS: Umbilical cable stress test",
      "  Scheduled: 2015-09-01",
    ],
  },
];

const categories = ["ALL", "REPORTS", "CLASSIFIED", "TECHNICAL"];

export default function BlogExample() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [unlockedPosts, setUnlockedPosts] = useState<Set<string>>(new Set());

  const filteredPosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const breakingPost = posts.find((p) => p.breaking);

  return (
    <div className="min-h-screen bg-eva-black">
      {/* Breaking news banner */}
      {breakingPost && (
        <EmergencyBanner
          text="BREAKING"
          subtext={breakingPost.title}
          visible
          severity="warning"
        />
      )}

      {/* Header */}
      <div className="border-b border-eva-orange px-6 py-3">
        <h1
          className="text-2xl uppercase tracking-[0.2em] text-eva-orange font-bold"
          style={{ fontFamily: "var(--font-eva-display)" }}
        >
          NERV INTELLIGENCE BULLETIN
        </h1>
        <p className="text-[10px] font-mono text-eva-mid-gray mt-1">
          CLASSIFIED COMMUNICATIONS — AUTHORIZED PERSONNEL ONLY
        </p>
      </div>

      {/* Category tabs */}
      <NavigationTabs
        tabs={categories.map((cat) => ({
          id: cat,
          label: cat,
          icon: cat === "CLASSIFIED" ? "◆" : undefined,
        }))}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
        color="orange"
      />

      <div className="grid grid-cols-12 gap-0">
        {/* Post list */}
        <div className="col-span-5 border-r border-eva-orange">
          <DataGrid
            columns={[
              { key: "id", header: "#", width: "50px" },
              { key: "title", header: "SUBJECT", sortable: true },
              { key: "date", header: "DATE", width: "100px", sortable: true, type: "datetime" },
              { key: "category", header: "CAT", width: "80px", align: "center", sortable: true },
            ]}
            data={filteredPosts.map((p) => ({
              id: p.id,
              title: p.title,
              date: p.date,
              category: p.category,
            }))}
            color="orange"
            title={`BULLETINS — ${activeCategory}`}
            maxHeight="500px"
          />

          <div className="p-3 space-y-1">
            {filteredPosts.map((post) => (
              <Button
                key={post.id}
                variant={
                  selectedPost?.id === post.id ? "primary" : "ghost"
                }
                size="sm"
                fullWidth
                onClick={() => setSelectedPost(post)}
              >
                {post.classified ? "◆ " : ""}
                {post.id} — {post.title.slice(0, 35)}
                {post.title.length > 35 ? "..." : ""}
              </Button>
            ))}
          </div>
        </div>

        {/* Post content */}
        <div className="col-span-7 p-4">
          {selectedPost ? (
            <div className="relative">
              {selectedPost.classified &&
              !unlockedPosts.has(selectedPost.id) ? (
                <div className="relative h-[500px]">
                  <ClassifiedOverlay
                    text="CLASSIFIED"
                    isUnlocked={false}
                  >
                    <TerminalDisplay
                      lines={selectedPost.content}
                      color="green"
                      title={selectedPost.title}
                      typewriter
                      maxHeight="460px"
                      showLineNumbers
                    />
                  </ClassifiedOverlay>
                  <div className="absolute bottom-4 left-4 right-4 z-[60]">
                    <Button
                      variant="danger"
                      fullWidth
                      onClick={() =>
                        setUnlockedPosts((prev) =>
                          new Set([...prev, selectedPost.id])
                        )
                      }
                    >
                      OVERRIDE CLEARANCE — DECRYPT
                    </Button>
                  </div>
                </div>
              ) : (
                <TerminalDisplay
                  lines={selectedPost.content}
                  color={selectedPost.classified ? "red" : "green"}
                  title={selectedPost.title}
                  typewriter
                  maxHeight="500px"
                  showLineNumbers
                />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <div className="text-center">
                <div className="text-eva-mid-gray font-mono text-sm uppercase tracking-wider">
                  SELECT A BULLETIN TO VIEW
                </div>
                <div className="text-eva-mid-gray/50 font-mono text-[10px] mt-2">
                  {filteredPosts.length} ENTRIES AVAILABLE
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
