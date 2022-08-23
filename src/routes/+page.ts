import { gql } from 'graphql-request';
import { SvelteGqlClient } from '$lib/client';

export const prerender = true;

const IndexPage_Query = gql`
  query IndexPage {
    page(id: "/", idType: URI) {
      title
      content
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
    }
  }
`;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load() {
  const client = SvelteGqlClient();

  const data = await client.request(IndexPage_Query);

  return data.page;
}
