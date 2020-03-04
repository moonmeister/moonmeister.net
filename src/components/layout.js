import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import tw from 'tailwind.macro';

import Typography from 'styles/Typography';
import Icon from 'components/icon';
import ExtLink from 'components/extLink';
import FormContact from 'components/formContact';
import PageCurl from 'components/pageCurl';
import Nav from 'components/nav';

import icons from 'constants/icons';
import { theme } from '../../tailwind.config';

import '../../node_modules/normalize.css/normalize.css';

const Content = tw.main`
  bg-grey-100
  max-w-full
`;

const Container = tw.div`
  mx-auto
  w-4/5
  p-16
`;

const Footer = styled.footer`
  ${tw`flex items-center flex-column md:flex-row bg-primary-600 text-grey-100 `}

  min-height: 35vh;
  padding: 3%;
  box-shadow: inset 0px 10px 10px -10px hsla(0, 0%, 5%, 1);
  text-shadow: 2px 2px 4px ${theme.colors.grey['900']};

  input,
  textarea,
  button {
    ${tw`text-grey-900`}
    text-shadow: 0;
  }

  a:visited {
    color: inherit;
  }

  a:link {
    color: inherit;
  }
`;

const Half = tw.section`
  w-full
  flex
  flex-col
  justify-center

  md:w-1/2
`;

const Social = tw.div`
  text-5xl
  justify-center
  flex
`;

const iconStyles = css`
  filter: drop-shadow(2px 2px 2px ${theme.colors.shadow});
  line-height: 0;
  margin: 0;
`;
const Layout = ({ children }) => (
  <>
    <Typography />
    <PageCurl />
    <Nav />
    <Content>
      <Container>{children}</Container>
    </Content>
    <Footer>
      <Half
        css={css`
          margin: auto;
        `}
      >
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
            display: inherit;
            justify-content: inherit;
          `}
        >
          &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
          <ExtLink aria-label="GatsbyJS Site" href="https://gatsbyjs.org">
            Gatsby
          </ExtLink>
          .
        </p>
      </Half>
    </Footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
