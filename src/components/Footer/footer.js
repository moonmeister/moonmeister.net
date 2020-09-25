import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from 'linaria';
import ExtLink from 'components/extLink';
import FormContact from 'components/FormContact';
import SocialLink from 'components/SocialLink';

import './footer.css';

const Footer = () => {
  const {
    wpMenu: {
      menuItems: { nodes: socials },
    },
  } = useStaticQuery(graphql`
    {
      wpMenu(locations: { eq: SOCIAL_MENU }) {
        menuItems {
          nodes {
            title
            connectedNode {
              __typename
              node {
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
      <section className="">
        <FormContact />
      </section>

      <section className="flex flex-col items-center my-16" id="footer-right">
        <ul
          className="social justify-center flex flex-wrap"
          css={css`
            a {
              outline-color: theme('colors.gray.100');
            }

            @screen canhover {
              li a {
                @apply transform transition-transform duration-100 ease-out;
              }

              li:hover,
              li:focus {
                a {
                  @apply shadow-lg -translate-y-1 ease-in;
                }
              }
            }
          `}
        >
          {socials.map(({ connectedNode: { node: social } }) => (
            <li key={social.id} className="">
              <SocialLink
                className="inline-block mb-2 shadow-lg"
                data={social}
              />
            </li>
          ))}
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
