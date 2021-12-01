/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

function SEO({ fullHead }) {
  return <Helmet>{fullHead}</Helmet>;
}

export const fragments = graphql`
  fragment SeoPostFragment on WpPost {
    seo {
      fullHead
    }
  }

  fragment SeoPageFragment on WpPage {
    seo {
      fullHead
    }
  }


`;

export default SEO;
