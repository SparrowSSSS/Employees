import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import config from "../../config"; // в репозитории файл конфига отсутсвует, необходимо создать его самостоятельно

const baseQuery = fetchBaseQuery({
    baseUrl: config.REACT_APP_BASE_URL_API, // базовый url к api из конфига, например: http://localhost:8000/api
    prepareHeaders(headers, { getState }) {
        const token = (getState() as RootState).auth.user?.token || localStorage.getItem("token");

        if (token && token !== null) {
            headers.set("authorization", `Bearer ${token}`);
        };
    }
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
});

export default api;