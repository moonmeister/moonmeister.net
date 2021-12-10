<script lang="ts">
  import { classNames } from '$lib/utils.js';
  import './blocks.css';
  export let content = '';
</script>

<div class={classNames('wp-blocks flow-root', $$props.class || '')}>{@html content}</div>
