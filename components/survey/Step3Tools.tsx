"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { AI_TOOLS, AI_USE_CASES } from "@/lib/constants";
import { SurveyFormData } from "@/lib/types";

interface Props {
  data: SurveyFormData;
  onChange: (updates: Partial<SurveyFormData>) => void;
}

function CheckboxGroup({
  options,
  selected,
  onChange,
  prefix,
}: {
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  prefix: string;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <div key={opt} className="flex items-center space-x-3 py-1">
          <Checkbox
            id={`${prefix}-${opt}`}
            checked={selected.includes(opt)}
            onCheckedChange={() => toggle(opt)}
          />
          <Label htmlFor={`${prefix}-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
            {opt}
          </Label>
        </div>
      ))}
    </div>
  );
}

export default function Step3Tools({ data, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-1">Your AI Tools</h2>
        <p className="text-[#F5EDE099] mb-6">
          Tell us about the AI tools you use.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          Which AI tools do you actively use?
        </Label>
        <CheckboxGroup
          options={AI_TOOLS}
          selected={data.ai_tools_used}
          onChange={(val) => onChange({ ai_tools_used: val })}
          prefix="tool"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What are you using AI for?
        </Label>
        <CheckboxGroup
          options={AI_USE_CASES}
          selected={data.ai_use_cases}
          onChange={(val) => onChange({ ai_use_cases: val })}
          prefix="usecase"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          Any tools you&apos;re curious about but haven&apos;t tried yet?
        </Label>
        <Textarea
          value={data.tools_curious}
          onChange={(e) => onChange({ tools_curious: e.target.value })}
          placeholder="e.g. I want to try building with Claude..."
          rows={3}
          className="bg-[#2A2522] border-[#C4613A22] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
        />
      </div>
    </div>
  );
}
