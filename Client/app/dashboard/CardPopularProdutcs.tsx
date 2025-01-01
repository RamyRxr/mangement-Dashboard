/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDashboardMetricsQuery } from "@/state/api";
import React from "react";

const CardPopularProducts = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const popularProducts = data?.popularProducts || [];

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col">
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Popular Products</h2>
            <span className="text-sm text-gray-400">Top selling this month</span>
          </div>
          <hr />

          {/* BODY */}
          <div className="mt-4">
            {popularProducts.length > 0 ? (
              <ul className="space-y-4">
                {popularProducts.map((product: any) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between border-b pb-3 last:border-b-0"
                  >
                    {/* PRODUCT INFO */}
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0">
                        <img
                          src={product.imageUrl || "/placeholder.jpg"}
                          alt={product.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    {/* SALES INFO */}
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {product.sales} Sold
                      </p>
                      <p className="text-xs text-gray-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No popular products to display.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
