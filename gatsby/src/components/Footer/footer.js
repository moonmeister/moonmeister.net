import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ExtLink from 'components/extLink';
import SocialLink from 'components/SocialLink';

import './footer.css';

const Footer = () => {
  const {
    wpMenu: {
      menuItems: { socials },
    },
  } = useStaticQuery(graphql`
    {
      wpMenu(locations: { eq: SOCIAL_MENU }) {
        menuItems {
          socials: nodes {
            connectedNode {
              social: node {
                ... on WpSocial {
                  id
                  title
                  socialMeta {
                    socialLinkType
                    primaryColor
                    textColor
                    url
                    document {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      {/* <section className="">
        <FormContact />
      </section> */}

      <section className="flex flex-col items-center my-16" id="footer-right">
        <ul className="social justify-center flex flex-wrap">
          {socials.map(({ connectedNode }) => {
            if (!connectedNode?.social) {
              return null;
            }

            const { social } = connectedNode;
            return (
              <li key={social.id} className="">
                <SocialLink className="inline-block mb-2 shadow-lg" data={social} />
              </li>
            );
          })}
        </ul>

        <p className="justify-inherit display-inherit mt-8 tracking-tight">
          &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
          <ExtLink aria-label="GatsbyJS Site" href="https://gatsbyjs.org">
            Gatsby
          </ExtLink>
          .
        </p>
      </section>
    </>
  );
};

export default Footer;
