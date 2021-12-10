<script lang="ts">
  import { TagIcon } from 'svelte-feather-icons';
  import Tag from './Tag.svelte';

  export let tags = [];
</script>

<TagIcon aria-hidden class="inline-block text-xls" size=24/>
<div class="inline-flex items-center box-border">
  {#if tags.length}
    {#each tags as tag}
      <span class="ml-2">
        <Tag aria-label="Post Tags" {tag} />
      </span>
    {/each}
  {:else}
    <Tag tag={{ name: 'none' }} />
  {/if}
</div>