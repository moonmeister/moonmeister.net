import * as React from 'react';
import ExtLink from 'components/extLink';
import { graphql } from 'gatsby';
import classnames from 'classnames';

function SocialLink({
  className,
  data: {
    title,
    socialMeta: { socialLinkType, url, document, primaryColor, textColor },
  },
}) {
  const finalUrl = socialLinkType === 'url' ? url : document.mediaItemUrl;

  return (
    <ExtLink
      className={classnames('m-2 p-2 rounded', className)}
      href={finalUrl}
      style={{ color: textColor, 'background-color': primaryColor }}
    >
      {title}
    </ExtLink>
  );
}

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
