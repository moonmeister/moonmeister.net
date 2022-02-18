<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  import { TAG_EXCERPT } from './Tag.svelte';
  export const ARCHIVE_FRAGMENT = gql`
    fragment ArchivePost on Post {
      id
      title
      excerpt
      uri
      dateGmt
      author {
        node {
          name
        }
      }
      tags {
        nodes {
          ...WpTagLink
        }
      }
    }
    ${TAG_EXCERPT}
  `;
</script>

<script lang="ts">
  import { formatDateString } from '$lib/utils.js';
  import { locale } from '$lib/store.js';
  import Tags from './Tags.svelte';

  export let posts = [];
</script>

<header class="sr-only">
  <h1>
    <slot />
  </h1>
</header>
<div aria-live="polite" id="blog-list" role="region">
  {#each posts as { id, title, excerpt, uri, author: { node: author }, dateGmt, tags } (id)}
    <article
      class="max-w-reading m-auto floating mb-6 p-6 transition-all duration-200 ease-in-out canhover:hover:-translate-y-1 canhover:hover:translate-x-1 canhover:hover:shadow-lg reduceMotion:translate-x-0 reduceMotion:translate-y-0"
    >
      <a sveltekit:prefetch href={uri}>
        <header class="mb-6">
          <h1
            aria-label="Blog Title"
            class="font-bold text-primary-900 text-2xl md:text-4xl leading-relaxed"
          >
            {title}
          </h1>
          <div class="text-sm text-gray-600">
            <span rel="author">{author.name} on </span>
            <time dateTime={dateGmt}>
              {formatDateString(dateGmt, $locale)}
            </time>
          </div>
        </header>

        <div class="text-primary-800 text-medium">
          {@html excerpt}
        </div>
      </a>

      <footer class="mt-6 text-sm text-gray-600">
        <Tags tags={tags.nodes} />
      </footer>
    </article>
  {/each}
</div>
