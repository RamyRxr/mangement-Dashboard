import { useGetDashboardMetricsQuery } from "@/state/api";
import React from "react";
import { ShoppingBag } from "lucide-react";

const CardPopularProducts = () => {
  const {
    data: dashboardMetrics,
    isLoading,
    error,
  } = useGetDashboardMetricsQuery();

  // Debugging: Log the data
  console.log("Fetched Dashboard Metrics:", dashboardMetrics);

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : error ? (
        <div className="m-5 text-red-500">Error fetching data.</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {/* Debugging: Display the raw data */}
            {dashboardMetrics?.popularProducts?.length ? (
              dashboardMetrics.popularProducts.map((product) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div>Image placeholder</div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {product.name}
                      </div>
                      <div className="flex text-sm items-center">
                        <span className="font-bold text-blue-500 text-xs">
                          ${product.price}
                        </span>
                        <span className="mx-2">|</span>
                        <div>Stock: {product.stockQuantity}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs flex items-center">
                    <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    {Math.round(product.stockQuantity / 1000)}k Sold
                  </div>
                </div>
              ))
            ) : (
              <div className="m-5 text-gray-500">
                No popular products found.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProducts;
