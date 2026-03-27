"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { SurveyResponse } from "@/lib/types";

const COLORS = ["#E8A838", "#C4613A", "#8B3A1F", "#D4845A", "#F5C66E"];

export default function ExperienceChart({ responses }: { responses: SurveyResponse[] }) {
  const counts: Record<string, number> = {};
  responses.forEach((r) => {
    if (r.experience_level) {
      const short = r.experience_level.split(" — ")[0];
      counts[short] = (counts[short] || 0) + 1;
    }
  });

  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="bg-[#2A2522] border border-[#C4613A22] rounded-xl p-6">
      <h3 className="text-[#F5EDE0] font-semibold mb-4">Experience Level Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: "#2A2522", border: "1px solid #C4613A33", color: "#F5EDE0" }} />
          <Legend wrapperStyle={{ color: "#F5EDE0BB" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
