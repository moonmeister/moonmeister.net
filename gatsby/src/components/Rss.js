import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function RssLink() {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return (
    <Helmet>
      <link
        href={`${siteUrl}/rss.xml`}
        rel="alternate"
        title="Subscribe to What's New"
        type="application/rss+xml"
      />
    </Helmet>
  );
}

export default RssLink;
