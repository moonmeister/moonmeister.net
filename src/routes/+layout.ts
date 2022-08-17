import { NAV_QUERY } from '$lib/components/Nav.svelte';
import { FOOTER_QUERY } from '$lib/components/Footer.svelte';

import { GraphQLClient } from 'graphql-request';
/** @type {import('@sveltejs/kit').LayoutLoad} */
export async function load({ fetch }) {
  const client = new GraphQLClient('https://api.moonmeister.net/graphql', {
    fetch,
  });

  const [{ data: navData }, { data: footerData }] = await client.batchRequests(
    [
      { document: NAV_QUERY },
      { document: FOOTER_QUERY },
    ]
  );

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  return {
    props: {
      navData,
      footerData,
    },
    stuff: {
      client,
    },
  };
}
