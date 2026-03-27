"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SurveyResponse } from "@/lib/types";

export default function TopicsChart({ responses }: { responses: SurveyResponse[] }) {
  const counts: Record<string, number> = {};
  responses.forEach((r) => {
    (r.next_topics || []).forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });

  const data = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  if (data.length === 0) return null;

  return (
    <div className="bg-[#2A2522] border border-[#C4613A22] rounded-xl p-6">
      <h3 className="text-[#F5EDE0] font-semibold mb-4">Requested Topics for Next Meetup</h3>
      <ResponsiveContainer width="100%" height={Math.max(250, data.length * 35)}>
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#C4613A15" />
          <XAxis type="number" stroke="#F5EDE077" allowDecimals={false} />
          <YAxis type="category" dataKey="name" stroke="#F5EDE077" width={200} tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: "#2A2522", border: "1px solid #C4613A33", color: "#F5EDE0" }} />
          <Bar dataKey="count" fill="#8B3A1F" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
