import { GraphQLClient } from 'graphql-request';

let customFetch;

let client;

export function SvelteGqlClient(someFetch) {
  if (!customFetch && !someFetch && !window) {
    throw new Error('Fetch not set');
  }

  if (someFetch) {
    customFetch = someFetch;
  }

  return (
    client ??
    new GraphQLClient('https://api.moonmeister.net/graphql', {
      fetch: customFetch,
    })
  );
}
