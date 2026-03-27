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

export default function RatingChart({ responses }: { responses: SurveyResponse[] }) {
  const data = [1, 2, 3, 4, 5].map((rating) => ({
    rating: `${rating} ★`,
    count: responses.filter((r) => r.overall_rating === rating).length,
  }));

  return (
    <div className="bg-[#2A2522] border border-[#C4613A22] rounded-xl p-6">
      <h3 className="text-[#F5EDE0] font-semibold mb-4">Overall Rating Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#C4613A15" />
          <XAxis dataKey="rating" stroke="#F5EDE077" />
          <YAxis stroke="#F5EDE077" allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#2A2522", border: "1px solid #C4613A33", color: "#F5EDE0" }}
            labelStyle={{ color: "#E8A838" }}
          />
          <Bar dataKey="count" fill="#E8A838" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
