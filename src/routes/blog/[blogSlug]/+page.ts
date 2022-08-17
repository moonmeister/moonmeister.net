import { gql } from 'graphql-request';
import { TAG_EXCERPT } from '$lib/components/Tag.svelte';

export const prerender = true;

const PAGE_EXCERPT = gql`
    query blogPostQuery($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        author {
          node {
            name
            avatar {
              foundAvatar
              rating
              height
              width
              url
            }
          }
        }
        content
        dateGmt
        tags {
          nodes {
            ...WpTagLink
          }
        }
      }
    }
    ${TAG_EXCERPT}
  `;

/** @type {import('@sveltejs/kit').PageLoad} */
throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ params, stuff: { client } }) {
  const data = await client.request(PAGE_EXCERPT, { id: params.blogSlug });
  return {
  post: data.post,
};
}


