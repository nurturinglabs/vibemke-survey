"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BACKGROUNDS, HOW_HEARD_OPTIONS } from "@/lib/constants";
import { SurveyFormData } from "@/lib/types";

interface Props {
  data: SurveyFormData;
  onChange: (updates: Partial<SurveyFormData>) => void;
  errors: Record<string, string>;
}

export default function Step1About({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-1">About You</h2>
        <p className="text-[#F5EDE099] mb-6">Tell us a bit about yourself.</p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What&apos;s your professional background? <span className="text-[#C4613A]">*</span>
        </Label>
        <RadioGroup
          value={data.background}
          onValueChange={(val) => onChange({ background: val })}
        >
          {BACKGROUNDS.map((opt) => (
            <div key={opt} className="flex items-center space-x-3 py-1">
              <RadioGroupItem value={opt} id={`bg-${opt}`} />
              <Label htmlFor={`bg-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.background && (
          <p className="text-sm text-[#C4613A]">{errors.background}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          How did you hear about Vibe MKE? <span className="text-[#C4613A]">*</span>
        </Label>
        <RadioGroup
          value={data.how_heard}
          onValueChange={(val) => onChange({ how_heard: val })}
        >
          {HOW_HEARD_OPTIONS.map((opt) => (
            <div key={opt} className="flex items-center space-x-3 py-1">
              <RadioGroupItem value={opt} id={`hh-${opt}`} />
              <Label htmlFor={`hh-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.how_heard && (
          <p className="text-sm text-[#C4613A]">{errors.how_heard}</p>
        )}
      </div>
    </div>
  );
}
