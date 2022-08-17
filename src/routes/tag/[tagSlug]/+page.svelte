<script lang="ts" context="module">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import { gql } from 'graphql-request';
  // import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';

  // export const prerender = true;

  // const TAG_QUERY = gql`
  //   query tagArchiveQuery($id: ID!) {
  //     tag(id: $id, idType: SLUG) {
  //       name
  //       posts {
  //         nodes {
  //           ...ArchivePost
  //         }
  //       }
  //     }
  //   }
  //   ${ARCHIVE_FRAGMENT}
  // `;

  // /** @type {import('@sveltejs/kit').Load} */
  // export async function load({ params, stuff: { client } }) {
  //   const data = await client.request(TAG_QUERY, { id: params.tagSlug });

  //   return {
  //     props: {
  //       tag: data.tag,
  //     },
  //   };
  // }
</script>

<script lang="ts">
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import ArchivePage from '$lib/components/Archive.svelte';

  export let tag;
</script>

<ArchivePage posts={tag.posts.nodes}>
  {tag.name}
</ArchivePage>
