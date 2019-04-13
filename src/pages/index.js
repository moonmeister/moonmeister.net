import React from 'react';
import { graphql } from 'gatsby';
import Headshot from 'components/headshot';
import SEO from 'components/seo';
import Layout from 'components/layout';

import styles from 'styles/index.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <section className={styles.intro}>
      <figure className={styles.headshot}>
        <Headshot />
      </figure>
      <section className={styles.content}>
        <p>
          Hi, I&#8217;m <b>Alex Moon</b> – a full stack software developer and
          operations engineer. My career has spanned a help desk, systems
          administration, and software development. When I am not working I can
          usually be found hiking, contributing to Open Source, or exploring
          Perth, Australia where I am currently living abroad.
        </p>
        <p>
          I am currently looking for new job opportunity. Checkout my resume
          below for more info.
        </p>
      </section>
    </section>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`;
