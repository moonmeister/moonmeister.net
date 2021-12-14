<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';

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

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({
    page,
    stuff: { client },
  }) {
    const data = await client.request(TAG_QUERY, { id: page.params.tagSlug });

    return {
      props: {
        tag: data.tag,
      },
    };
  }
</script>

<script lang="ts">
  import ArchivePage from '$lib/components/Archive.svelte';
  
  export let tag;
</script>

<ArchivePage posts={tag.posts.nodes}>
  {tag.name}
</ArchivePage>
