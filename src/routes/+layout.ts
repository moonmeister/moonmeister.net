import { SvelteGqlClient } from '$lib/client';
import { getSdk } from "$lib/sdk"

/** @type {import('@sveltejs/kit').LayoutLoad} */
export async function load({ fetch }) {
  const client = SvelteGqlClient(fetch);
  const sdk = getSdk(client);

  const navMenu = await sdk.NavMenu()
  const socialMenu = await sdk.socialMenu()

  return {
    navData: navMenu,
    footerData: socialMenu,
  };
}
