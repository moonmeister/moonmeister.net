<script lang="ts">
  import Blocks from '$lib/components/Blocks.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({
    content,
    featuredImage: { node: featuredImage },
  } = data);
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
