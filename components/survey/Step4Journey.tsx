"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { EXPERIENCE_LEVELS } from "@/lib/constants";
import { SurveyFormData } from "@/lib/types";

interface Props {
  data: SurveyFormData;
  onChange: (updates: Partial<SurveyFormData>) => void;
  errors: Record<string, string>;
}

export default function Step4Journey({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-1">Your AI Journey</h2>
        <p className="text-[#F5EDE099] mb-6">
          Help us understand where you are with AI.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          How would you describe your current AI experience level?{" "}
          <span className="text-[#C4613A]">*</span>
        </Label>
        <RadioGroup
          value={data.experience_level}
          onValueChange={(val) => onChange({ experience_level: val })}
        >
          {EXPERIENCE_LEVELS.map((opt) => (
            <div key={opt} className="flex items-center space-x-3 py-1">
              <RadioGroupItem value={opt} id={`exp-${opt}`} />
              <Label htmlFor={`exp-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.experience_level && (
          <p className="text-sm text-[#C4613A]">{errors.experience_level}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What&apos;s your biggest challenge with AI right now?
        </Label>
        <Textarea
          value={data.biggest_challenge}
          onChange={(e) => onChange({ biggest_challenge: e.target.value })}
          placeholder="e.g. knowing where to start, keeping up with new tools, applying it to my work..."
          rows={3}
          className="bg-[#2A2522] border-[#C4613A22] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
        />
      </div>
    </div>
  );
}
