import * as React from 'react';
import PropTypes from 'prop-types';
import tw from 'tailwind.macro';
import { css } from '@emotion/core';

import Icon from 'components/Icon';
import ExtLink from 'components/extLink';
import FormContact from 'components/FormContact';
// import PageCurl from 'components/pageCurl';
import Nav from 'components/nav';
import icons from 'constants/icons';

import 'styles/base.css';

const Half = tw.section`w-full flex flex-col justify-center md:w-1/2`;
const Social = tw.div`text-5xl justify-center flex`;

const iconStyles = css`
  filter: drop-shadow(2px 2px 2px theme('colors.shadow'));
  line-height: 0;
  margin: 0;
`;
const Layout = ({ children }) => (
  <>
    {/* <PageCurl /> */}
    <header>
      <Nav />
    </header>
    <main css={tw`max-w-full mx-auto p-4 md:p-8 sm:w-4/5 md:w-3/5`}>
      {children}
    </main>
    <footer
      className="text-shadow"
      css={css`
        ${tw`flex items-center flex-column md:flex-row bg-primary-600 text-gray-100 `}
        min-height: 35vh;
        padding: 3%;
        box-shadow: inset 0px 10px 10px -10px hsla(0, 0%, 5%, 1);
        /* text-shadow: 2px 2px 4px black; */

        input,
        textarea,
        button {
          ${tw`text-gray-900`};
          text-shadow: 0;
        }

        a:visited {
          color: inherit;
        }

        a:link {
          color: inherit;
        }
      `}
    >
      <Half css={tw`m-auto`}>
        <FormContact />
      </Half>

      <Half>
        <Social>
          <ExtLink
            aria-label="GitHub"
            css={iconStyles}
            href="https://github.com/moonmeister"
            title="GitHub"
          >
            <Icon icon={icons.GITHUB} tooltip="GitHub" />
          </ExtLink>
          <ExtLink
            aria-label="Resume (PDF)"
            css={iconStyles}
            href="/alex-moon-resume.pdf"
            title="Resume (PDF)"
          >
            <Icon icon={icons.DOCUMENT} tooltip="Resume/CV" />
          </ExtLink>
          <ExtLink
            aria-label="Twitter"
            css={iconStyles}
            href="https://twitter.com/moon_meister"
            title="Twitter"
          >
            <Icon icon={icons.TWITTER} tooltip="Twitter" />
          </ExtLink>
          <ExtLink
            aria-label="Instagram"
            css={iconStyles}
            href="https://www.instagram.com/moon_meister/"
            title="Instagram"
          >
            <Icon icon={icons.INSTAGRAM} tooltip="Instagram" />
          </ExtLink>
        </Social>

        <p
          css={css`
            display: 'inherit';
            justify-content: 'inherit';
          `}
        >
          &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
          <ExtLink aria-label="GatsbyJS Site" href="https://gatsbyjs.org">
            Gatsby
          </ExtLink>
          .
        </p>
      </Half>
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
