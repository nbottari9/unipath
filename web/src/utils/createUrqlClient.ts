import { cacheExchange, createClient, fetchExchange } from "@urql/core";

export const urqlClient = createClient({
    url: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    fetchOptions: {
        headers: {
            "Content-Type": "application/json"
        }
    },
    exchanges: [cacheExchange, fetchExchange],
})