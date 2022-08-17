import { gql } from 'graphql-request';

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

throw new Error("@migration task: Check if you need to migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ stuff: { client } }) {
  const data = await client.request(IndexPage_Query);

  return {
  indexPage: data.page,
};
}
