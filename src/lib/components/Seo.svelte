<script lang="ts" context="module">
  import { gql } from 'graphql-request';

  export const SEO_QUERY = gql`
    query SEO_QUERY($path: String!) {
      nodeByUri(uri: $path) {
        ... on Page {
          seo {
            fullHead
          }
        }
        ... on Post {
          seo {
            fullHead
          }
        }
        ... on Tag {
          seo {
            fullHead
          }
        }
      }
    }
  `;
</script>

<script lang="ts">
  export let fullHead;
</script>

<svelte:head>
  {@html fullHead}
</svelte:head>
