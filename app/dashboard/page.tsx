"use client";

import { useState, useCallback } from "react";
import { useSurveyResponses } from "@/hooks/useSurveyResponses";
import PasscodeGate from "@/components/dashboard/PasscodeGate";
import MetricCard from "@/components/dashboard/MetricCard";
import RatingChart from "@/components/dashboard/RatingChart";
import ExperienceChart from "@/components/dashboard/ExperienceChart";
import ToolsChart from "@/components/dashboard/ToolsChart";
import UseCasesChart from "@/components/dashboard/UseCasesChart";
import BackgroundChart from "@/components/dashboard/BackgroundChart";
import FormatChart from "@/components/dashboard/FormatChart";
import TopicsChart from "@/components/dashboard/TopicsChart";
import WouldReturnChart from "@/components/dashboard/WouldReturnChart";
import FreeTextPanel from "@/components/dashboard/FreeTextPanel";
import ResponsesTable from "@/components/dashboard/ResponsesTable";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const {
    responses,
    loading,
    error,
    fetchResponses,
    meetupNames,
    selectedMeetup,
    setSelectedMeetup,
  } = useSurveyResponses();

  const handleUnlock = useCallback(
    async (pc: string) => {
      setPasscode(pc);
      const success = await fetchResponses(pc);
      if (success) {
        setUnlocked(true);
      }
    },
    [fetchResponses]
  );

  const handleRefresh = () => {
    fetchResponses(passcode);
  };

  if (!unlocked) {
    return (
      <PasscodeGate
        onUnlock={handleUnlock}
        error={error}
        loading={loading}
      />
    );
  }

  // Compute metrics
  const totalResponses = responses.length;
  const avgRating =
    totalResponses > 0
      ? (
          responses.reduce((sum, r) => sum + (r.overall_rating || 0), 0) /
          totalResponses
        ).toFixed(1)
      : "—";
  const wouldReturnPct =
    totalResponses > 0
      ? `${Math.round(
          (responses.filter(
            (r) =>
              r.would_return === "Definitely yes" ||
              r.would_return === "Probably yes"
          ).length /
            totalResponses) *
            100
        )}%`
      : "—";

  // Mode of experience level
  const expCounts: Record<string, number> = {};
  responses.forEach((r) => {
    if (r.experience_level) {
      const short = r.experience_level.split(" — ")[0];
      expCounts[short] = (expCounts[short] || 0) + 1;
    }
  });
  const mostCommonLevel =
    Object.entries(expCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="min-h-screen bg-[#1A1714]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#1A1714]/90 backdrop-blur border-b border-[#C4613A33] px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-[#E8A838] tracking-widest uppercase">
            Vibe MKE Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <select
              value={selectedMeetup}
              onChange={(e) => setSelectedMeetup(e.target.value)}
              className="bg-[#2A2522] border border-[#C4613A33] text-[#F5EDE0CC] rounded-lg px-3 py-1.5 text-sm"
            >
              {meetupNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Responses" value={totalResponses} />
          <MetricCard
            title="Average Rating"
            value={avgRating}
            subtitle="out of 5"
          />
          <MetricCard
            title="Would Return"
            value={wouldReturnPct}
            subtitle="Definitely + Probably"
          />
          <MetricCard title="Most Common Level" value={mostCommonLevel} />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RatingChart responses={responses} />
          <ExperienceChart responses={responses} />
          <WouldReturnChart responses={responses} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToolsChart responses={responses} />
          <UseCasesChart responses={responses} />
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BackgroundChart responses={responses} />
          <FormatChart responses={responses} />
          <TopicsChart responses={responses} />
        </div>

        {/* Free Text Panel */}
        <FreeTextPanel responses={responses} />

        {/* Data Table */}
        <ResponsesTable responses={responses} />
      </main>
    </div>
  );
}
