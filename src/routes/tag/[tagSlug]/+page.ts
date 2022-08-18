import { gql } from 'graphql-request';
import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';
import { SvelteGqlClient } from '$lib/client';

export const prerender = true;

const TAG_QUERY = gql`
  query tagArchiveQuery($id: ID!) {
    tag(id: $id, idType: SLUG) {
      name
      posts {
        nodes {
          ...ArchivePost
        }
      }
    }
  }
  ${ARCHIVE_FRAGMENT}
`;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  const client = SvelteGqlClient();
  const data = await client.request(TAG_QUERY, { id: params.tagSlug });

  return {
    tag: data.tag,
  };
}
