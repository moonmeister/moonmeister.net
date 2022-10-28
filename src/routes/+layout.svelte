
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
  #page-layout {
    @supports (display: grid) {
      display: grid;
      grid-template-columns: 0.03fr 1fr 0.03fr;
      grid-template-rows: max-content auto max-content;
      grid-row-gap: 1rem;

      @screen sm {
        grid-row-gap: 5%;
        grid-row-gap: 5vmin;
      }

      @screen md {
        grid-template-columns: 10vmin auto 10vmin;
      }
      justify-items: stretch;

      header {
        grid-area: 1 / 1 / 2 / 4;
      }

      main {
        grid-area: 2 / 2 / 3 / 3;
        @apply p-0 m-0 w-auto max-w-screen-md;
        justify-self: center;
        margin: '5% auto';
        margin: '5vmin auto';
      }
      footer {
        grid-area: 3 / 1 / 4 / 4;
      }
    }
  }
</style>
