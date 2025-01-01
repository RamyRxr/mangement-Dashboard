import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import numeral from "numeral";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary || [];
  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  return (
    <div className="bg-white shadow-lg rounded-xl flex flex-col justify-between p-5">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Purchase Summary
            </h2>
            <span className="text-sm text-gray-400">22 - 29 October 2023</span>
          </div>
          <hr />

          {/* BODY */}
          <div className="mt-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500">Total Purchases</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "$0"}
                </p>
                {lastDataPoint && (
                  <div
                    className={`ml-3 flex items-center ${
                      (lastDataPoint.changePercentage ?? 0) >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {(lastDataPoint.changePercentage ?? 0) >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage ?? 0)}%
                  </div>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 20, left: -20, bottom: 10 }}
              >
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fillOpacity={0.3}
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
