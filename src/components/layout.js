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

const Content = styled.main`
  ${tw`bg-main`}
  max-width: 100%;
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 9% 0;
`;

const Footer = styled.footer`
  ${tw`md:flex-row bg-purple text-text-lighter text-shadow-footer`}

  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 35vh;
  padding: 3%;
  box-shadow: inset 0px 10px 10px -10px hsla(0, 0%, 5%, 1);
  text-shadow: 2px 2px 4px ${theme.colors.shadow};

  input,
  textarea,
  button {
    ${tw`text-text-default`}
    text-shadow: 0;
  }

  a:visited {
    color: inherit;
  }

  a:link {
    color: inherit;
  }
`;

const Half = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${tw`md:w-1/2`}
`;

const Social = styled.div`
  font-size: 3rem;
  margin-top: 2.4rem;

  display: inherit;
  justify-content: inherit;

  a {
    line-height: 0;
    margin: 0.3em;
  }
`;

const iconStyles = css`
  filter: drop-shadow(2px 2px 2px ${theme.colors.shadow});
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
