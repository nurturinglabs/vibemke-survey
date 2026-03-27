"use client";

const STEP_LABELS = [
  "About You",
  "This Meetup",
  "Your AI Tools",
  "AI Journey",
  "Next Meetup",
];

export default function SurveyProgress({ currentStep }: { currentStep: number }) {
  const progress = ((currentStep + 1) / STEP_LABELS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={`text-xs font-medium tracking-wide uppercase transition-colors ${
              i <= currentStep ? "text-[#E8A838]" : "text-[#F5EDE066]"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#2A2522]">
        <div
          className="h-full bg-gradient-to-r from-[#C4613A] to-[#E8A838] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-[#F5EDE077] mt-2 text-center">
        Step {currentStep + 1} of {STEP_LABELS.length}
      </p>
    </div>
  );
}
