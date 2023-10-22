import { createListenerMiddleware } from "@reduxjs/toolkit";
import { authApi } from "../app/services/auth";

export const lisetenerMiddleware = createListenerMiddleware();

lisetenerMiddleware.startListening({
    matcher: authApi.endpoints.login.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();

        if (action.payload.token) {
            localStorage.setItem("token", action.payload.token);
        };
    }
});