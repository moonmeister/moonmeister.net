<script lang="ts">
  import ArchivePage from '$lib/components/Archive.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<ArchivePage posts={data.tag.posts.nodes}>
  {data.tag.name}
</ArchivePage>
