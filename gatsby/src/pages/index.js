import * as React from 'react';

import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import SEO from 'components/seo';
import Layout from 'components/Layout';

import Blocks from 'components/Blocks';

const IndexPage = ({
  data: {
    wpPage: {
      title,
      content,
      featuredImage: { node: featuredImage },
    },
  },
}) => (
  <Layout>
    <SEO keywords={[`gatsby`, `application`, `react`]} title={title} />
    <section className="floating p-1 pt-8 md:p-8 flex flex-col md:flex-row-reverse items-center justify-between">
      <figure className="flex sm:w-1/2 md:w-4/12 overflow-hidden w-4/5 rounded-full shadow-lg">
        <GatsbyImage
          alt={featuredImage.altText}
          image={getImage(featuredImage.localFile)}
          loading="eager"
        />
      </figure>
      <div className="md:w-7/12 m-6">
        <Blocks content={content} />
      </div>
    </section>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  {
    wpPage(isFrontPage: { eq: true }) {
      title
      content
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                width: 400
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`;
