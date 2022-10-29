<script lang="ts">
  import { classNames } from '$lib/utils.js';
  import { page } from '$app/stores';

  $: ({ class: propClass, href, title } = $$props);

  $: isActive = $page.url.pathname == href;
</script>

<a
  sveltekit:prefetch
  {href}
  class={classNames(
    propClass,
    'inline-block mx-2 p-1 text-2xl text-blue-600 uppercase text-shadow-sm group-hover:text-pink-600 group-hover:-translate-y-1 group-hover:ease-in'
  )}
  {title}
  class:active={isActive}
>
  <slot />
</a>

<style lang="postcss">

</style>
