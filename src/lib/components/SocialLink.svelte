<script lang="ts" context="module">
  import { gql } from 'graphql-request';
  export const SOCIAL_LINK_FRAGMENT = gql`
    fragment SocialLink on Social {
      title
      socialMeta {
        socialLinkType
        primaryColor
        textColor
        url
        document {
          mediaItemUrl
        }
      }
    }
  `;
</script>

<script lang="ts">
  import { classNames } from '$lib/utils.js';

  export let socialMeta;

  $: ({ socialLinkType, url, document, primaryColor, textColor } = socialMeta);

  const finalUrl = socialLinkType === 'url' ? url : document.mediaItemUrl;
</script>

<a
  rel="noopener noreferrer"
  target="_blank"
  class={classNames('m-2 p-2 rounded outline', $$props.class || '')}
  href={finalUrl}
  style="color: {textColor}; background-color: {primaryColor};"
>
  <slot />
</a>

<style lang="postcss">
  a {
    outline-color: theme('colors.gray.100');
  }

  @screen canhover {
      a {
        @apply transform transition-transform duration-100 ease-out;
      }

      a:hover,
      a:focus {
          @apply shadow-lg -translate-y-1 ease-in;
      }
    }
</style>
