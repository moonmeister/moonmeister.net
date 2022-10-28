import { gql } from 'graphql-request';
import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';
import { SvelteGqlClient } from '$lib/client';

const BLOG_POST_QUERY = gql`
  query BlogArchive {
    posts(where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...ArchivePost
      }
    }

    page(id: "/blog/", idType: URI) {
      title
    }
  }
  ${ARCHIVE_FRAGMENT}
`;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ setHeaders }) {
  const client = SvelteGqlClient();
  const data = await client.request(BLOG_POST_QUERY);

  setHeaders({
    'cache-control': "max-age=60, stale-while-revalidate=600"
  })

  return {
    posts: data.posts.nodes,
    pageTitle: data.page?.title,
  };
}
