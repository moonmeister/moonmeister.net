import * as React from 'react';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import classnames from 'classnames';
import { LocaleProvider } from 'hooks/useLocale';
import RssLink from 'components/Rss';

import 'styles/tailwind.css';
import './layout.css';

const Layout = ({ children }) => (
  <LocaleProvider>
    <RssLink />
    <div className="h-screen" id="page-layout">
      <header>
        <Nav />
      </header>
      <main
        className={classnames(
          'max-w-full self-center px-2 my-6 md:mb-16 md:mt-12 md:w-4/5 md:max-w-screen-lg'
        )}
        // eslint-disable-next-line no-dupe-keys
        style={{ margin: '5% auto', margin: '5vmin auto' }}
      >
        {children}
      </main>
      <footer className="flex items-center flex-col md:flex-row md:justify-evenly bg-primary-600 text-gray-100 shadow-footer px-2 py-8 md:px-8">
        <Footer />
      </footer>
    </div>
  </LocaleProvider>
);

export default Layout;
