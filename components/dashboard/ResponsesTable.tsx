"use client";

import { useState } from "react";
import { SurveyResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 20;

export default function ResponsesTable({ responses }: { responses: SurveyResponse[] }) {
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalPages = Math.ceil(responses.length / PAGE_SIZE);
  const paged = responses.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="bg-[#2A2522] border border-[#C4613A22] rounded-xl p-6">
      <h3 className="text-[#F5EDE0] font-semibold mb-4">All Responses</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-[#C4613A33]">
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Date</th>
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Name</th>
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Background</th>
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Rating</th>
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Experience</th>
              <th className="text-[#F5EDE099] font-medium py-3 px-2">Would Return</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((r) => (
              <>
                <tr
                  key={r.id}
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                  className="border-b border-[#C4613A15] cursor-pointer hover:bg-[#C4613A11] transition-colors"
                >
                  <td className="py-3 px-2 text-[#F5EDE0CC]">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-[#F5EDE0CC]">{r.name || "—"}</td>
                  <td className="py-3 px-2 text-[#F5EDE0CC]">{r.background}</td>
                  <td className="py-3 px-2 text-[#E8A838]">{r.overall_rating}/5</td>
                  <td className="py-3 px-2 text-[#F5EDE0CC]">
                    {r.experience_level?.split(" — ")[0] || "—"}
                  </td>
                  <td className="py-3 px-2 text-[#F5EDE0CC]">{r.would_return}</td>
                </tr>
                {expandedId === r.id && (
                  <tr key={`${r.id}-detail`}>
                    <td colSpan={6} className="bg-[#1A1714] px-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <Detail label="Email" value={r.email} />
                        <Detail label="How Heard" value={r.how_heard} />
                        <Detail label="Most Valuable" value={r.most_valuable} />
                        <Detail label="Improvement" value={r.improvement} />
                        <Detail label="Venue Rating" value={r.venue_rating ? `${r.venue_rating}/5` : null} />
                        <Detail label="AI Tools" value={r.ai_tools_used?.join(", ")} />
                        <Detail label="AI Use Cases" value={r.ai_use_cases?.join(", ")} />
                        <Detail label="Tools Curious About" value={r.tools_curious} />
                        <Detail label="Biggest Challenge" value={r.biggest_challenge} />
                        <Detail label="Next Topics" value={r.next_topics?.join(", ")} />
                        <Detail label="Preferred Format" value={r.preferred_format} />
                        <Detail label="Other Feedback" value={r.other_feedback} />
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            Previous
          </Button>
          <span className="text-[#F5EDE099] text-sm">
            Page {page + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-[#F5EDE066]">{label}:</span>{" "}
      <span className="text-[#F5EDE0CC]">{value}</span>
    </div>
  );
}
