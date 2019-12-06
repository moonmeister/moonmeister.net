import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from 'components/seo';
import Layout from 'components/layout';

const Intro = styled.section`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${tw`md:flex-row-reverse`}
`;

const Headshot = styled.figure`
  width: 80%;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 2px 10px 10px 0px hsl(0, 0, 50%);

  ${tw`md:w-4/12`}
`;

const Content = styled.section`
  ${tw`md:w-7/12`}
`;

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Intro>
      <Headshot>
        <Img
          fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
        />
      </Headshot>
      <Content
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Intro>
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
