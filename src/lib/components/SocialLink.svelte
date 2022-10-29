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

  $: finalUrl = socialLinkType === 'url' ? url : document.mediaItemUrl;
</script>

<a
  rel="noopener noreferrer"
  target="_blank"
  class={classNames('block m-2 p-2 rounded', $$props.class || '')}
  href={finalUrl}
  style="color: {textColor}; background-color: {primaryColor};"
>
  <slot />
</a>

<style lang="postcss">
</style>
