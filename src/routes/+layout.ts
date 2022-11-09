import { NAV_QUERY } from "$lib/components/Nav.svelte";
import { FOOTER_QUERY } from "$lib/components/Footer.svelte";

import { SvelteGqlClient } from "$lib/client";

/** @type {import('@sveltejs/kit').LayoutLoad} */
export async function load({ fetch }) {
  const client = SvelteGqlClient(fetch);
  try {
    const [{ data: navData }, { data: footerData }] = await client
      .batchRequests([
        { document: NAV_QUERY },
        { document: FOOTER_QUERY },
      ]);

    return {
      navData,
      footerData,
    };
  } catch (error) {
    console.log("I don't know why this is erroring...it seems to be working fine...");
  }
}
