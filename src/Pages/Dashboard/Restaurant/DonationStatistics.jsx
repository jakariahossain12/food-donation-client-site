import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const CustomCard = ({ children }) => (
  <div className="rounded-xl shadow-lg border border-teal-600 p-6 bg-gradient-to-tr from-teal-50 via-teal-100 to-white">
    {children}
  </div>
);

const DonationStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ["donationStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/restaurant/donation-stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center py-20 text-teal-700 font-semibold">
        Loading Chart...
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-800 drop-shadow-sm">
        📊 Donation Statistics
      </h2>
      <CustomCard>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={stats}
            margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorQty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00705C" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#66B2A9" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#c4f0e9" />
            <XAxis
              dataKey="type"
              tick={{ fill: "#004d40", fontWeight: "600" }}
              axisLine={{ stroke: "#00705C" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#004d40", fontWeight: "600" }}
              axisLine={{ stroke: "#00705C" }}
              tickLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#e0f2f1",
                borderRadius: "8px",
                borderColor: "#00705C",
              }}
              cursor={{ fill: "rgba(0, 112, 92, 0.1)" }}
            />
            <Legend wrapperStyle={{ color: "#00695c", fontWeight: "700" }} />
            <Bar
              dataKey="quantity"
              fill="url(#colorQty)"
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CustomCard>
    </div>
  );
};

export default DonationStatistics;
