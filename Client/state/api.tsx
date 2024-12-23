/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query";


export const api = createApi ({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({}) 
});

export const { } = api;