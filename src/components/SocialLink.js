import * as React from 'react';
import PropTypes from 'prop-types';
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

SocialLink.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    socialMeta: PropTypes.shape({
      textColor: PropTypes.string.isRequired,
      primaryColor: PropTypes.string.isRequired,
      socialLinkType: PropTypes.string.isRequired,
      url: PropTypes.string,
      document: PropTypes.shape({
        mediaItemUrl: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};
export default SocialLink;
