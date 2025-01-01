import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    date: string;
    changePercentage?: number;
}

export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
}

export interface ExpenseSummary {
    changePercentage: number;
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}

export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
}



export const api = createApi ({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["DashboardMetrics", "Products", "Users", "Expenses"],
    endpoints: (build) => ({

        getUsers: build.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users"],
        }),

        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
                url: "/products",
                params: search ? { search } : {},
            }),
            providesTags: ["Products"],
        }),

        createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
                url: "/products",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),

        getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"],
        }),

        getDashboardMetrics: build.query<DashboardMetrics, void>({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"],
        })
    }) 
});


// here you must get an error if the api is not available 
// or an error because this is missing [import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";]

export const { 
    useGetUsersQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetExpensesByCategoryQuery,
    useGetDashboardMetricsQuery
} = api;