import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:8088/api/query",
        fetchOptions: { cache: "no-store" }, // Opt-out of Next.js fetch cache for dynamic data
    }),
    cache: new InMemoryCache(),
});

export default client;
