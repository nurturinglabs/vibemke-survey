"use client";

import { useState, useCallback, useMemo } from "react";
import { SurveyResponse } from "@/lib/types";

export function useSurveyResponses() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMeetup, setSelectedMeetup] = useState("All Meetups");

  const fetchResponses = useCallback(async (passcode: string): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Failed to fetch");
      }
      const { data } = await res.json();
      setResponses(data || []);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const meetupNames = useMemo(() => {
    const names = new Set(responses.map((r) => r.meetup_name));
    return ["All Meetups", ...Array.from(names).sort()];
  }, [responses]);

  const filtered = useMemo(() => {
    if (selectedMeetup === "All Meetups") return responses;
    return responses.filter((r) => r.meetup_name === selectedMeetup);
  }, [responses, selectedMeetup]);

  return {
    responses: filtered,
    allResponses: responses,
    loading,
    error,
    fetchResponses,
    meetupNames,
    selectedMeetup,
    setSelectedMeetup,
  };
}
