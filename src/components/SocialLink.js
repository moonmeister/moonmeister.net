import * as React from 'react';
import ExtLink from 'components/extLink';
import { graphql } from 'gatsby';
import { css } from 'linaria';
import classnames from 'classnames';

const SocialLink = ({
  className,
  data: {
    title,
    socialMeta: { socialLinkType, url, document, primaryColor, textColor },
  },
}) => {
  const finalUrl = socialLinkType === 'url' ? url : document.mediaItemUrl;

  return (
    <ExtLink
      className={classnames(
        'm-2 p-2 rounded',
        className,
        css`
          color: var(--text-color);
          background-color: var(--bg-color);
        `
      )}
      href={finalUrl}
      style={{ '--text-color': textColor, '--bg-color': primaryColor }}
    >
      {title}
    </ExtLink>
  );
};

export const fragments = graphql`
  fragment SocialLinkData on WpSocial {
    id
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

SocialLink.defaultProps = {
  className: '',
};

export default SocialLink;
