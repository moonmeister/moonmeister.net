<script lang="ts" context="module">
  throw new Error("@migration task: Replace error load function (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3293209)");

  // export async function load({ error, status }) {
  //   return {
  //     props: {
  //       title: error.message,
  //     },
  //   };
  // }
</script>

<script lang="ts">
  export let title = '';
</script>

<h1>{title}</h1>
<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
