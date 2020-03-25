import * as React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

// import PageCurl from 'components/pageCurl';
import Nav from 'components/Nav';
import Footer from 'components/Footer';

import { LocaleProvider } from 'hooks/useLocale';

import 'styles/base.css';
import 'styles/components.css';
import 'styles/utilities.css';
import './layout.css';

const Layout = ({ children }) => (
  <LocaleProvider>
    <div className="h-screen" id="page-layout">
      {/* <PageCurl /> */}
      <header>
        <Nav />
      </header>
      <main
        className="max-w-full self-center px-2 my-6 md:mb-16 md:mt-12 md:w-4/5 md:max-w-screen-lg"
        css={css`
          margin: 5% auto;
          margin: 5vmin auto;
        `}
      >
        {children}
      </main>
      <footer className="flex items-center flex-col md:flex-row md:justify-evenly bg-primary-600 text-gray-100 shadow-footer px-2 py-8 md:px-8">
        <Footer />
      </footer>
    </div>
  </LocaleProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
