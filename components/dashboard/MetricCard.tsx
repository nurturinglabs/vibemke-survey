"use client";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
}

export default function MetricCard({ title, value, subtitle }: Props) {
  return (
    <div className="bg-[#2A2522] border-t-[3px] border-t-[#C4613A] border border-[#C4613A22] rounded-xl p-6">
      <p className="text-sm text-[#F5EDE099] mb-1">{title}</p>
      <p className="text-3xl font-bold text-[#E8A838]">{value}</p>
      {subtitle && <p className="text-sm text-[#F5EDE066] mt-1">{subtitle}</p>}
    </div>
  );
}
