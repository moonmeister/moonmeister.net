import { gql } from 'graphql-request';
import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';
import { SvelteGqlClient } from '$lib/client';

export const prerender = true;

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
export async function load() {
  const client = SvelteGqlClient();
  const data = await client.request(BLOG_POST_QUERY);

  return {
    posts: data.posts.nodes,
    pageTitle: data.page?.title,
  };
}
