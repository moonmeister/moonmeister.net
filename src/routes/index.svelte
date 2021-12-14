<script lang="ts" context="module">
  import { gql } from 'graphql-request';
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

  export async function load({ stuff: { client } }) {
    const data = await client.request(IndexPage_Query);

    return {
      props: {
        indexPage: data.page,
      },
    };
  }
</script>

<script lang="ts">
  import Blocks from '$lib/components/Blocks.svelte';

  export let indexPage;

  $: ({
    title,
    content,
    featuredImage: { node: featuredImage },
  } = indexPage);
</script>

<section
  class="floating p-1 pt-8 md:p-8 flex flex-col md:flex-row-reverse items-center justify-between"
>
  <figure class="flex sm:w-1/2 md:w-4/12 overflow-hidden w-4/5 rounded-full shadow-lg">
    <img alt={featuredImage.altText} src={featuredImage.sourceUrl} loading="eager" />
  </figure>
  <div class="md:w-7/12 m-6">
    <Blocks {content} />
  </div>
</section>
