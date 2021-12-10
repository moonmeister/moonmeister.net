<script lang="ts" context="module">
  import { gql } from 'graphql-request';

  export const NAV_QUERY = gql`
    query NavMenu {
      navMenu: menuItems(where: { location: MAIN_MENU }) {
        nodes {
          title
          url
          label
        }
      }
    }
  `;
</script>

<script lang="ts">
  import NavLink from './NavLink.svelte';

  export let menuItems;
</script>

<nav>
  <ul class="m-0 flex flex-wrap flex-row justify-center items-center md:justify-end px-10 pt-4">
    {#each menuItems?.nodes as { title, url, label }}
      <li class="group list-none m-1">
        <NavLink {title} href={url}>
          {label}
        </NavLink>
      </li>
    {/each}
  </ul>
</nav>