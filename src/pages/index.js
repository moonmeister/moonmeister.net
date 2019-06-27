import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from 'components/seo';
import Layout from 'components/layout';

import styles from 'styles/index.module.scss';

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className={styles.intro}>
      <figure className={styles.headshot}>
        <Img
          fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
        />
      </figure>
      <section
        className={styles.content}
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </section>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
      html: PropTypes.string,
    }),
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 1024, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      html
    }
  }
`;
