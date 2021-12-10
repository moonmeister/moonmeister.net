<script lang="ts" context="module">
  import { gql } from 'graphql-request';

  export const TAG_EXCERPT = gql`
    fragment WpTagLink on Tag {
      name
      uri
    }
  `;
</script>

<script lang="ts">
  import { getRandomInt } from '$lib/utils.js';

  export let tag;

  const { name, uri } = tag;
</script>

<a href={uri}>
  <div class="gradient-border relative rounded z-10">
    <p class="tag capitalize px-1 bg-gray-100 rounded-sm" {...$$props}>
      {name}
    </p>
    <div
      class='inset-0 absolute'
      style="content: '';
          z-index: -1;
          margin: -1px;
          border-radius: inherit;
          filter: brightness(0.9);
          background: linear-gradient(
            {getRandomInt(360, 20)}deg,
            orange,
            yellow,
            green,
            cyan,
            indigo,
            violet);
      "
    />
  </div>
</a>
