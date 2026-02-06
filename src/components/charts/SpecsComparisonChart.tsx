"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BrandSpecs } from "@/lib/chart-utils";

interface Props {
  data: BrandSpecs[];
}

export default function SpecsComparisonChart({ data }: Props) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="brand" angle={-45} textAnchor="end" height={50} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="avgRam" fill="#3b82f6" name="RAM Promedio (GB)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="avgStorage" fill="#10b981" name="Almacenamiento Promedio (GB)" radius={[8, 8, 0, 0]} />
          <Bar dataKey="avgBattery" fill="#f59e0b" name="Batería Promedio (mAh)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
