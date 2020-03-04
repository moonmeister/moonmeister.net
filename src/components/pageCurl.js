import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import ExtLink from 'components/extLink';

import styled from '@emotion/styled';
import tw from 'tailwind.macro';
import { theme, mq } from '../../tailwind.config';

const curlSizeWidth = theme.extend.width.curl;
const curlSizeHeight = theme.extend.height.curl;
const phoneRatio = 3;

function phoneOpenSize(size) {
  return `${size} * 2`;
}

function openSize(size) {
  return `${size} * 3`;
}

function clipPath(height) {
  // clip-path: polygon(0 0, /*a*/ 48% /*b*/ 100%, 100% $height); //left side

  return `
    clip-path: polygon(
      100% 0%,
      /*a*/ 43% /*b*/ 95%,
      0% calc(${height} * ${phoneRatio})
    ); //right side

    ${mq.sm} {
      clip-path: polygon(100% 0%, /*a*/ 43% /*b*/ 95%, 0% ${height}); //right side
    };
  `;
}

const CurlBG = styled.div`
  width: calc(${curlSizeWidth} * ${phoneRatio});
  height: calc(${curlSizeHeight} * ${phoneRatio});
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  transition: inherit;
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%); /*left side*/
  ${tw`sm:w-curl sm:h-curl`}
`;

const CurlContent = styled.div`
  position: absolute;
  object-fit: cover;
  left: -5px;
`;

const CurlCode = styled.div`
  width: 100vw;
  font-size: 0.75em;
  line-height: 1em;
`;

const CurlPage = styled.div`
  transition: inherit;
  position: absolute;
  display: block;
  content: '';
  width: calc(${curlSizeWidth} * ${phoneRatio});
  height: calc(${curlSizeWidth} * ${phoneRatio});
  left: 0;
  top: 0;

  ${mq.sm}{
    width: ${curlSizeWidth};
    height: ${curlSizeWidth};
  }

  ${clipPath(curlSizeHeight)}

  background: linear-gradient(
    315deg,
    hsla(0, 0%, 85%, 0.9) 15%,
    ${theme.colors.gray['300']},
    hsla(0, 0%, 60%, 0.9) 85%
  );
`;

const Curl = styled.div`
  filter: drop-shadow(0px 0px 8px ${theme.colors.shadow});

  &:hover {
    filter: drop-shadow(0px 0px 30px ${theme.colors.shadow});

    ${CurlBG} {
      transition: inherit;

      box-shadow: 10px 10px ${theme.colors.gray['500']};
      width: calc(
        ${phoneOpenSize(curlSizeWidth * phoneRatio)}
      ); /* default width of page curl */
      height: calc(
        ${phoneOpenSize(curlSizeHeight * phoneRatio)}
      ); /* default height of page curl */

      ${mq.sm} {
        width: calc(${openSize(curlSizeWidth)});
        height: calc(${openSize(curlSizeHeight)});
      }
    }

    ${CurlPage} {
      z-index: 1000;

      width: calc(
        ${phoneOpenSize(curlSizeWidth * phoneRatio)}
      ); // default width of page curl
      height: calc(
        ${phoneOpenSize(curlSizeWidth * phoneRatio)}
      ); // default height of page curl

      ${clipPath(`calc(${phoneOpenSize(curlSizeHeight)})`)}

      ${mq.sm} {
        width: calc(${openSize(curlSizeWidth)});
        height: calc(${openSize(curlSizeWidth)});

        ${clipPath(`calc(${openSize(curlSizeHeight)})`)}
      }
    }
  }

  transition: all 0.5s ease-in;
`;

const PageCurl = () => {
  const { code } = useStaticQuery(
    graphql`
      query {
        code: file(relativePath: { eq: "code.png" }) {
          childImageSharp {
            fluid(maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  return (
    <Curl>
      <CurlBG>
        <CurlContent className="CurlPage">
          <ExtLink
            ariaLabel="Checkout the code repository on GitHub"
            href="http://github.com/moonmeister/moonmeister.net"
            title="Site Code - GitHub"
          >
            <CurlCode aria-hidden>
              <Img alt="html code" fluid={code.childImageSharp.fluid} />
            </CurlCode>
          </ExtLink>
        </CurlContent>
      </CurlBG>

      <CurlPage aria-hidden className="CurlPage" />
    </Curl>
  );
};

PageCurl.defaultProps = {
  // children: 'test',
};

PageCurl.propTypes = {
  // children: PropTypes.node,
};

export default PageCurl;
