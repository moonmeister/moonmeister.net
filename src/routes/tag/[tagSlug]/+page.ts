import { gql } from 'graphql-request';
import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';

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
throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ params, stuff: { client } }) {
  const data = await client.request(TAG_QUERY, { id: params.tagSlug });

  return {
  tag: data.tag,
};
}
