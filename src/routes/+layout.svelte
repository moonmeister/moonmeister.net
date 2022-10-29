
<script lang="ts">
  export const csr = false;

  import '../app.css';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Seo from '$lib/components/Seo.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

</script>

<Seo />
<div class="h-screen" id="page-layout">
  <header>
    <Nav menuItems={data.navData?.navMenu} />
  </header>
  <main class={'max-w-full self-center px-2 my-6 md:mb-16 md:mt-12 md:w-4/5 md:max-w-screen-lg'}>
    <slot />
  </main>
  <footer
    class="flex items-center flex-col md:flex-row md:justify-evenly bg-primary-600 text-gray-100 shadow-footer px-2 py-8 md:px-8"
  >
    <Footer socials={data.footerData?.socialMenu} />
  </footer>
</div>

<style lang="postcss">
</style>
