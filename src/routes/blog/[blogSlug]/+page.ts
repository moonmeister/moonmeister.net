import { gql } from 'graphql-request';
import { TAG_EXCERPT } from '$lib/components/Tag.svelte';
import { SvelteGqlClient } from '$lib/client';

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
export async function load({ params, setHeaders }) {
  const client = SvelteGqlClient();
  const data = await client.request(PAGE_EXCERPT, { id: params.blogSlug });

  setHeaders({
    'cache-control': "max-age=600, stale-while-revalidate=3600"
  })

  return data.post;
}
