import { GraphQLClient } from "graphql-request";

type Fetch = typeof fetch

let customFetch: Fetch;

let client: GraphQLClient;

export function SvelteGqlClient(someFetch?: Fetch) {
  if (!customFetch && !someFetch && !window) {
    throw new Error("Fetch not set");
  }

  if (someFetch) {
    customFetch = someFetch;
  }

  return (
    client ??
      new GraphQLClient("https://api.moonmeister.net/graphql", {
        fetch: customFetch,
      })
  );
}
