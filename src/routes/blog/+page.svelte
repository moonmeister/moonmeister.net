<script lang="ts">
  import ArchivePage from '$lib/components/Archive.svelte';
/** @type {import('./$types').PageData} */
  export let data;

  $:({ posts, pageTitle } = data)
</script>

<ArchivePage {posts}>
  {pageTitle}
</ArchivePage>
