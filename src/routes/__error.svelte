<script lang="ts" context="module">
  export async function load({ error, status }) {
    return {
      props: {
        title: error.message,
      },
    };
  }
</script>

<script lang="ts">
  export let title = '';
</script>

<h1>{title}</h1>
<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
