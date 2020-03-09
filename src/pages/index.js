import * as React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from 'components/seo';
import Layout from 'components/layout';

import Blocks from 'components/Blocks';

const IndexPage = ({
  data: {
    wpPage: { title, blocks, featuredImage },
  },
}) => (
  <Layout>
    <SEO keywords={[`gatsby`, `application`, `react`]} title={title} />
    <section className="p-0 flex flex-col md:flex-row-reverse items-center justify-between">
      <figure className="sm:w-1/2 md:w-4/12 overflow-hidden w-4/5 rounded-full shadow-lg">
        <Img
          alt={featuredImage.altText}
          fluid={featuredImage.remoteFile.childImageSharp.fluid}
        />
      </figure>
      <div className="md:w-7/12 m-6">
        <Blocks blocks={blocks} />
      </div>
    </section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    wpPage: PropTypes.shape({
      title: PropTypes.string,
      blocks: PropTypes.array.isRequired,
      featuredImage: PropTypes.object.isRequired,
    }),
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    wpPage(databaseId: { eq: 5 }) {
      title
      blocks {
        ...BlocksFragment
      }
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
