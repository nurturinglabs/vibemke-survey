"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { WOULD_RETURN_OPTIONS } from "@/lib/constants";
import { SurveyFormData } from "@/lib/types";

interface Props {
  data: SurveyFormData;
  onChange: (updates: Partial<SurveyFormData>) => void;
  errors: Record<string, string>;
}

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-3xl transition-colors ${
            star <= value ? "text-[#E8A838]" : "text-[#F5EDE033]"
          } hover:text-[#E8A838]`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Step2Meetup({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-1">About This Meetup</h2>
        <p className="text-[#F5EDE099] mb-6">How was your experience today?</p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          How would you rate today&apos;s meetup overall? <span className="text-[#C4613A]">*</span>
        </Label>
        <StarRating
          value={data.overall_rating}
          onChange={(v) => onChange({ overall_rating: v })}
        />
        {errors.overall_rating && (
          <p className="text-sm text-[#C4613A]">{errors.overall_rating}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What was most valuable to you today?
        </Label>
        <Textarea
          value={data.most_valuable}
          onChange={(e) => onChange({ most_valuable: e.target.value })}
          placeholder="e.g. the demo, the people I met, a specific topic..."
          rows={3}
          className="bg-[#2A2522] border-[#C4613A22] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What could be improved?
        </Label>
        <Textarea
          value={data.improvement}
          onChange={(e) => onChange({ improvement: e.target.value })}
          placeholder="Any suggestions for next time..."
          rows={3}
          className="bg-[#2A2522] border-[#C4613A22] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          Would you attend another Vibe MKE event? <span className="text-[#C4613A]">*</span>
        </Label>
        <RadioGroup
          value={data.would_return}
          onValueChange={(val) => onChange({ would_return: val })}
        >
          {WOULD_RETURN_OPTIONS.map((opt) => (
            <div key={opt} className="flex items-center space-x-3 py-1">
              <RadioGroupItem value={opt} id={`wr-${opt}`} />
              <Label htmlFor={`wr-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.would_return && (
          <p className="text-sm text-[#C4613A]">{errors.would_return}</p>
        )}
      </div>
    </div>
  );
}
