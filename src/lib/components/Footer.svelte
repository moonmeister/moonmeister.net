<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  import { SOCIAL_LINK_FRAGMENT } from './SocialLink.svelte';

  export const FOOTER_QUERY = gql`
    query socialMenu {
      socialMenu: menuItems(where: { location: SOCIAL_MENU }) {
        nodes {
          connectedNode {
            social: node {
              ...SocialLink
            }
          }
        }
      }
    }
    ${SOCIAL_LINK_FRAGMENT}
  `;
</script>

<script lang="ts">
  import ExtLink from './ExtLink.svelte';
  import SocialLink from './SocialLink.svelte';

  export let socials;
</script>

<section class="flex flex-col items-center my-16" id="footer-right">
  <ul class="social justify-center flex flex-wrap">
    {#each socials?.nodes as node}
      {#if node.connectedNode?.social}
        <li>
          <SocialLink
            class="inline-block mb-2 shadow-lg"
            socialMeta={node.connectedNode.social.socialMeta}
          >
            {node.connectedNode.social.title}
          </SocialLink>
        </li>
      {/if}
    {/each}
  </ul>

  <p class="justify-inherit display-inherit mt-8 tracking-tight">
    &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
    <ExtLink aria-label="SvelteKit Site" href="https://kit.svelte.dev/">Svelte Kit</ExtLink>
    .
  </p>
</section>

<style lang="postcss">

</style>
