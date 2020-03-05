import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from 'components/seo';
import Layout from 'components/layout';

const IndexPage = ({
  data: {
    wpPage: { title, content, featuredImage },
  },
}) => (
  <Layout>
    <SEO keywords={[`gatsby`, `application`, `react`]} title={title} />
    <section className="p-0 flex flex-col md:flex-row-reverse align-center justify-between">
      <figure className="md:w-4/12 overflow-hidden w-4/5 rounded-full shadow-xl">
        <Img
          alt={featuredImage.altText}
          fluid={featuredImage.remoteFile.childImageSharp.fluid}
        />
      </figure>
      <section
        className="md:w-7/12"
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    wpPage: PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
      featuredImage: PropTypes.object,
    }),
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    wpPage(databaseId: { eq: 5 }) {
      content
      title
      featuredImage {
        altText
        remoteFile {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
