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
import { page } from "$app/stores";
</script>

<svelte:head>
  <link rel="canonical" href={`https://moonmeister.net${$page.url.pathname}`}>
</svelte:head>
