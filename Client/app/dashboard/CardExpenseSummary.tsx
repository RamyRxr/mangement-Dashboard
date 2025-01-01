import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import numeral from "numeral";

const CardExpenseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const expenseData = data?.expenseSummary || [];
  const lastDataPoint = expenseData[expenseData.length - 1] || null;

  return (
    <div className="bg-white shadow-lg rounded-xl flex flex-col justify-between p-5">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Expense Summary</h2>
            <span className="text-sm text-gray-400">22 - 29 October 2023</span>
          </div>
          <hr />

          {/* BODY */}
          <div className="mt-6">
            <div className="mb-6">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-800">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalExpenses).format("$0.00a")
                    : "$0"}
                </p>
                {lastDataPoint && (
                  <div
                    className={`ml-3 flex items-center ${
                      lastDataPoint.changePercentage >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {lastDataPoint.changePercentage >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage)}%
                  </div>
                )}
              </div>
            </div>
            <hr />
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
