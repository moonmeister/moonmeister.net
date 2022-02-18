<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  import { TAG_EXCERPT } from '$lib/components/Tag.svelte';

  const PAGE_EXCERPT = gql`
    query blogPostQuery($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        author {
          node {
            name
            avatar {
              foundAvatar
              rating
              height
              width
              url
            }
          }
        }
        content
        dateGmt
        tags {
          nodes {
            ...WpTagLink
          }
        }
      }
    }
    ${TAG_EXCERPT}
  `;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, stuff: { client } }) {
    const data = await client.request(PAGE_EXCERPT, { id: params.blogSlug });
    return {
      props: {
        post: data.post,
      },
    };
  }

  export const hydrate = false;
  export const prerender = true;
</script>

<script lang="ts">
  import readingTime from 'reading-time/lib/reading-time.js';
  import { Edit3Icon, ClockIcon } from 'svelte-feather-icons';
  import Tags from '$lib/components/Tags.svelte';
  import Blocks from '$lib/components/Blocks.svelte';

  import { formatDateString } from '$lib/utils.js';

  export let post;
  $: ({
    title,
    content,
    dateGmt,
    author: { node: author },
    tags: { nodes: allTags },
  } = post);
  $: ({ avatar } = author);

  $: rtData = readingTime(content);
</script>

<article class="max-w-reading m-auto floating max-w-64 px-6">
  <header class="border-b flex flex-col items-center text-center py-3 ">
    <h1 class="text-4xl font-bold z-0">{title}</h1>

    <div class="flex m-4">
      {#if avatar.foundAvatar && avatar.rating === 'g'}
        <img
          alt={`${author.name} headshot`}
          class="rounded-full w-16 col-span-1 row-start-1 row-end-3 bg-gray-200 text-transparent"
          height={avatar.height}
          loading="lazy"
          src={avatar.url}
          width={avatar.width}
        />
      {/if}
      <div class="flex flex-col justify-center">
        <div class="text-left text-gray-600 row-auto">
          <Edit3Icon aria-hidden class="inline-svg text-gray-700 mr-2" />

          <span aria-label="author">{author.name}</span>
        </div>
        <p class="text-gray-600 row-auto">
          <ClockIcon aria-hidden class="inline-svg text-gray-700 mr-2" />
          {rtData.text} · {formatDateString(dateGmt)}
        </p>
      </div>
    </div>
  </header>
  <div id="blog-content">
    <Blocks {content} />
  </div>
  <footer class="border-t py-6 text-sm text-gray-600">
    <Tags tags={allTags} />
  </footer>
</article>
