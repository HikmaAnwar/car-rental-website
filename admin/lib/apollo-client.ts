import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:8088/api/query", // Links to your Go Backend
  }),
  cache: new InMemoryCache(),
});

export default client;
