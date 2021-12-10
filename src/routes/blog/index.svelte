<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';

  const BLOG_POST_QUERY = gql`
      query BlogArchive {
        posts(where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            ...ArchivePost
          }
        }
        
        page(id: "/blog/" idType: URI) {
          title
        }
      }
      ${ARCHIVE_FRAGMENT}
    `;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ stuff: { client } }) {
    const data = await client.request(BLOG_POST_QUERY);
    return {
      props: {
        posts: data.posts.nodes,
        pageTitle: data.page.title,
      },
    };
  }
</script>

<script lang="ts">
  import ArchivePage from '$lib/components/Archive.svelte';

  export let posts = [];
  export let pageTitle = '';
</script>

<ArchivePage {posts}>
  {pageTitle}
</ArchivePage>
