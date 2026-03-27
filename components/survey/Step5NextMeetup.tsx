"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { NEXT_TOPICS, PREFERRED_FORMATS } from "@/lib/constants";
import { SurveyFormData } from "@/lib/types";

interface Props {
  data: SurveyFormData;
  onChange: (updates: Partial<SurveyFormData>) => void;
}

export default function Step5NextMeetup({ data, onChange }: Props) {
  const toggleTopic = (topic: string) => {
    if (data.next_topics.includes(topic)) {
      onChange({ next_topics: data.next_topics.filter((t) => t !== topic) });
    } else {
      onChange({ next_topics: [...data.next_topics, topic] });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#F5EDE0] mb-1">Next Meetup Input</h2>
        <p className="text-[#F5EDE099] mb-6">
          Help us plan the next Vibe MKE event.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What topics do you want covered at the next meetup?
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {NEXT_TOPICS.map((topic) => (
            <div key={topic} className="flex items-center space-x-3 py-1">
              <Checkbox
                id={`topic-${topic}`}
                checked={data.next_topics.includes(topic)}
                onCheckedChange={() => toggleTopic(topic)}
              />
              <Label htmlFor={`topic-${topic}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {topic}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          What meetup format do you prefer?
        </Label>
        <RadioGroup
          value={data.preferred_format}
          onValueChange={(val) => onChange({ preferred_format: val })}
        >
          {PREFERRED_FORMATS.map((opt) => (
            <div key={opt} className="flex items-center space-x-3 py-1">
              <RadioGroupItem value={opt} id={`fmt-${opt}`} />
              <Label htmlFor={`fmt-${opt}`} className="font-normal cursor-pointer text-[#F5EDE0CC]">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold text-[#F5EDE0]">
          Anything else you&apos;d like to share?
        </Label>
        <Textarea
          value={data.other_feedback}
          onChange={(e) => onChange({ other_feedback: e.target.value })}
          placeholder="Any other thoughts, ideas, or feedback..."
          rows={3}
          className="bg-[#2A2522] border-[#C4613A22] text-[#F5EDE0] placeholder:text-[#F5EDE044]"
        />
      </div>
    </div>
  );
}
