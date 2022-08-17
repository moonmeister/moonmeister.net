import { gql } from 'graphql-request';
import { ARCHIVE_FRAGMENT } from '$lib/components/Archive.svelte';

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
throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ stuff: { client } }) {
  const data = await client.request(BLOG_POST_QUERY);
  return {
  posts: data.posts.nodes,
  pageTitle: data.page.title,
};
}
