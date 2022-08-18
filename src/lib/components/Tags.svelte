<script lang="ts">
  import { TagIcon } from 'svelte-feather-icons';
  import Tag from './Tag.svelte';

  export let tags = [];
</script>

<TagIcon aria-hidden class="inline-block text-xls" size="24" />
<div class="inline-flex items-center box-border gap-4">
  {#if tags.length}
    {#each tags as tag}
      <Tag aria-label="Post Tags" {tag} />
    {/each}
  {:else}
    <Tag tag={{ name: 'none' }} />
  {/if}
</div>
