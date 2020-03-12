import * as React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/Icon';
import ExtLink from 'components/extLink';
import FormContact from 'components/FormContact';
// import PageCurl from 'components/pageCurl';
import Nav from 'components/Nav';
import icons from 'constants/icons';

import { LocaleProvider } from 'hooks/useLocale';

import 'styles/base.css';
import 'styles/components.css';
import 'styles/utilities.css';

const Layout = ({ children }) => (
  <LocaleProvider>
    <div className="h-screen flex flex-col justify-between">
      {/* <PageCurl /> */}
      <header>
        <Nav />
      </header>
      <main className="max-w-full self-center my-8 md:my-16 md:w-4/5 lg:w-3/5 transition-layout duration-500 ease-in">
        {children}
      </main>
      <footer className="text-shadow flex items-center flex-col md:flex-row bg-primary-600 text-gray-100 shadow-footer p-2 md:p-8">
        <section className="half m-auto">
          <FormContact />
        </section>

        <section className="half">
          <div className="social">
            <ExtLink
              aria-label="GitHub"
              href="https://github.com/moonmeister"
              title="GitHub"
            >
              <Icon icon={icons.GITHUB} tooltip="GitHub" />
            </ExtLink>
            <ExtLink
              aria-label="Resume (PDF)"
              href="/alex-moon-resume.pdf"
              title="Resume (PDF)"
            >
              <Icon icon={icons.DOCUMENT} tooltip="Resume/CV" />
            </ExtLink>
            <ExtLink
              aria-label="Twitter"
              href="https://twitter.com/moon_meister"
              title="Twitter"
            >
              <Icon icon={icons.TWITTER} tooltip="Twitter" />
            </ExtLink>
            <ExtLink
              aria-label="Instagram"
              href="https://www.instagram.com/moon_meister/"
              title="Instagram"
            >
              <Icon icon={icons.INSTAGRAM} tooltip="Instagram" />
            </ExtLink>
          </div>

          <p className="justify-inherit display-inherit">
            &copy;{new Date().getFullYear()} Alex Moon. Built with&nbsp;
            <ExtLink aria-label="GatsbyJS Site" href="https://gatsbyjs.org">
              Gatsby
            </ExtLink>
            .
          </p>
        </section>
      </footer>
    </div>
  </LocaleProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
