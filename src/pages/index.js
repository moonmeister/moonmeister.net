import * as React from 'react';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from 'components/seo';
import Layout from 'components/Layout';

import Blocks from 'components/Blocks';

const IndexPage = ({
  data: {
    wpPage: {
      title,
      blocks,
      featuredImage: { node: featuredImage },
    },
  },
}) => (
    <Layout>
      <SEO keywords={[`gatsby`, `application`, `react`]} title={title} />
      <section className="floating p-1 pt-8 md:p-8 flex flex-col md:flex-row-reverse items-center justify-between">
        <figure className="sm:w-1/2 md:w-4/12 overflow-hidden w-4/5 rounded-full shadow-lg">
          <Img
            alt={featuredImage.altText}
            fluid={featuredImage.localFile.childImageSharp.fluid}
          />
        </figure>
        <div className="md:w-7/12 m-6">
          <Blocks blocks={blocks} />
        </div>
      </section>
    </Layout>
  );

export default IndexPage;

export const pageQuery = graphql`
  {
    wpPage(isFrontPage: { eq: true }) {
      title
      blocks {
        ...BlocksFragment
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1024, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`;
