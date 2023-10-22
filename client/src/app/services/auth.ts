import { User } from "@prisma/client";
import api from "./api";

export type TypeUserData = Omit<User, "id">;
type TypeResponseUserData = User & {token: string};

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation<TypeResponseUserData, TypeUserData>({
            query: (userData) => ({
                url: "/users/login",
                method: "POST",
                body: userData
            })
        }),

        register: builder.mutation<TypeResponseUserData, TypeUserData>({
            query: (userData) => ({
                url: "/users/register",
                method: "POST",
                body: userData
            })
        }),

        current: builder.query<TypeResponseUserData, void>({
            query: () => ({
                url: "/users/current",
                method: "GET"
            })
        })

    })
});

export const {useLoginMutation, useRegisterMutation, useCurrentQuery} = authApi;

export const { endpoints: {login, register, current} } = authApi;