import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import ExtLink from 'components/extLink';

import styles from './pageCurl.module.scss';

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
    <div className={styles.curl}>
      <div className={styles.curlBkg}>
        <div className={styles.curlContent}>
          <ExtLink
            href="http://github.com/moonmeister/moonmeister.net"
            ariaLabel="Checkout the code repository on GitHub"
          >
            <div className={styles.curlCode}>
              <Img fluid={code.childImageSharp.fluid} alt="html code" />
            </div>
          </ExtLink>
        </div>
      </div>

      <div className={styles.curlPage} />
    </div>
  );
};

PageCurl.defaultProps = {
  // children: 'test',
};

PageCurl.propTypes = {
  // children: PropTypes.node,
};

export default PageCurl;
