import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function DashboardOverview() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({});
    console.log(stats);

  useEffect(() => {
    const fetchStats = async () => {
      if (user.role === "admin") {
        const res = await axiosSecure.get("/admin-stats");
        setStats(res.data);
      } else {
        const res = await axiosSecure.get(`/user-stats/${user.email}`);
        setStats(res.data);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {/* Summary Cards */}
      <div className="grid  grid-cols-2 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="p-4 rounded-2xl shadow bg-base-200">
            <h3 className="text-lg font-semibold capitalize">{key}</h3>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Chart Example */}
      <div className="bg-base-200 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Overview Chart</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={Object.entries(stats).map(([k, v]) => ({
              name: k,
              value: v,
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#00705C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart Example */}
      <div className="bg-base-200 p-6 rounded-2xl shadow">
        <h2 className="text-xl font-bold mb-4">Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={Object.entries(stats).map(([k, v]) => ({
                name: k,
                value: v,
              }))}
              dataKey="value"
              outerRadius={80}
              label
            >
              {Object.entries(stats).map((_, i) => (
                <Cell
                  key={i}
                  fill={["#00705C", "#fdd65b", "#f97316", "#0ea5e9"][i % 4]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
