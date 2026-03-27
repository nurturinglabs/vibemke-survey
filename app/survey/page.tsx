"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SurveyProgress from "@/components/survey/SurveyProgress";
import Step1About from "@/components/survey/Step1About";
import Step2Meetup from "@/components/survey/Step2Meetup";
import Step3Tools from "@/components/survey/Step3Tools";
import Step4Journey from "@/components/survey/Step4Journey";
import Step5NextMeetup from "@/components/survey/Step5NextMeetup";
import ThankYou from "@/components/survey/ThankYou";
import { SurveyFormData } from "@/lib/types";
import { MEETUP_NAME } from "@/lib/constants";

const INITIAL_DATA: SurveyFormData = {
  name: "",
  email: "",
  background: "",
  how_heard: "",
  overall_rating: 0,
  most_valuable: "",
  improvement: "",
  venue_rating: 0,
  would_return: "",
  ai_tools_used: [],
  ai_use_cases: [],
  tools_curious: "",
  experience_level: "",
  biggest_challenge: "",
  next_topics: [],
  preferred_format: "",
  other_feedback: "",
};

const TOTAL_STEPS = 5;

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (updates: Partial<SurveyFormData>) => {
    setData((prev) => ({ ...prev, ...updates }));
    const clearedErrors = { ...errors };
    for (const key of Object.keys(updates)) {
      delete clearedErrors[key];
    }
    setErrors(clearedErrors);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!data.background) newErrors.background = "Please select your background.";
      if (!data.how_heard) newErrors.how_heard = "Please select how you heard about us.";
    }

    if (step === 1) {
      if (!data.overall_rating) newErrors.overall_rating = "Please rate the meetup.";
      if (!data.would_return) newErrors.would_return = "Please select an option.";
    }

    if (step === 3) {
      if (!data.experience_level)
        newErrors.experience_level = "Please select your experience level.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, meetup_name: MEETUP_NAME }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <ThankYou />;

  return (
    <div className="min-h-screen bg-[#1A1714] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#C4613A22] py-4 px-4">
        <h1 className="text-2xl font-extrabold text-[#E8A838] text-center tracking-widest uppercase">
          Vibe MKE
        </h1>
      </header>

      <main className="flex-1 px-4 py-8 max-w-2xl mx-auto w-full">
        <SurveyProgress currentStep={step} />

        <div className="rounded-xl">
          {step === 0 && <Step1About data={data} onChange={update} errors={errors} />}
          {step === 1 && <Step2Meetup data={data} onChange={update} errors={errors} />}
          {step === 2 && <Step3Tools data={data} onChange={update} />}
          {step === 3 && <Step4Journey data={data} onChange={update} errors={errors} />}
          {step === 4 && <Step5NextMeetup data={data} onChange={update} />}
        </div>

        {submitError && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 text-red-300 rounded-lg text-sm">
            {submitError}
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <Button variant="outline" onClick={back}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button onClick={submit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
