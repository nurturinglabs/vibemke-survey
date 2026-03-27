"use client";

import { useState } from "react";
import { SurveyResponse } from "@/lib/types";

function TextCards({ title, items }: { title: string; items: { text: string; date: string }[] }) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <h4 className="text-[#E8A838] font-medium">{title}</h4>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-[#1A1714] border-l-[3px] border-l-[#C4613A] border border-[#C4613A22] rounded-lg p-4"
          >
            <p className="text-[#F5EDE0CC] text-sm">{item.text}</p>
            <p className="text-[#F5EDE066] text-xs mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FreeTextPanel({ responses }: { responses: SurveyResponse[] }) {
  const [open, setOpen] = useState(false);

  const extract = (field: keyof SurveyResponse) =>
    responses
      .filter((r) => r[field])
      .map((r) => ({
        text: r[field] as string,
        date: new Date(r.created_at).toLocaleDateString(),
      }));

  const mostValuable = extract("most_valuable");
  const improvements = extract("improvement");
  const challenges = extract("biggest_challenge");

  const total = mostValuable.length + improvements.length + challenges.length;
  if (total === 0) return null;

  return (
    <div className="bg-[#2A2522] border border-[#C4613A22] rounded-xl p-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-[#F5EDE0] font-semibold"
      >
        <span>What attendees said ({total} responses)</span>
        <span className="text-[#C4613A]">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="mt-6 space-y-8">
          <TextCards title="Most Valuable" items={mostValuable} />
          <TextCards title="Improvements" items={improvements} />
          <TextCards title="Biggest Challenges" items={challenges} />
        </div>
      )}
    </div>
  );
}
