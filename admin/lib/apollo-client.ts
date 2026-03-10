import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "http://localhost:8088/api/query",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    // Get the access token from local storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    // Add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }));

    return forward(operation);
});

const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
});

export default client;
