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
  box-shadow: 2px 10px 10px 0px hsl(0, 0%, 50%);

  ${tw`md:w-4/12`}
`;

const Content = styled.section`
  ${tw`md:w-7/12`}
`;

const IndexPage = ({
  data: {
    wpPage: { title, content, featuredImage },
  },
}) => (
  <Layout>
    <SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
    <Intro>
      <Headshot>
        <Img fluid={featuredImage.remoteFile.childImageSharp.fluid} />
      </Headshot>
      <Content
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Intro>
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
