import * as React from 'react';
import { css } from 'linaria';

import Nav from 'components/Nav';
import Footer from 'components/Footer';
import classnames from 'classnames';
import { LocaleProvider } from 'hooks/useLocale';
import RssLink from 'components/Rss';

import 'styles/base.css';
import 'styles/components.css';
import 'styles/utilities.css';

const Layout = ({ children }) => (
  <LocaleProvider>
    <RssLink />
    <div
      className="h-screen"
      css={css`
        @supports (display: grid) {
          display: grid;
          grid-template-columns: 0.03fr 1fr 0.03fr;
          grid-template-rows: max-content auto max-content;
          grid-row-gap: 1rem;

          @screen sm {
            grid-row-gap: 5%;
            grid-row-gap: 5vmin;
          }

          @screen md {
            grid-template-columns: 10vmin auto 10vmin;
          }

          justify-items: stretch;

          header {
            grid-area: 1 / 1 / 2 / 4;
          }

          main {
            grid-area: 2 / 2 / 3 / 3;
            @apply p-0 m-0 w-auto max-w-screen-md;
            justify-self: center;
          }
          footer {
            grid-area: 3 / 1 / 4 / 4;
          }
        }
      `}
      id="page-layout"
    >
      <header>
        <Nav />
      </header>
      <main
        className={classnames(
          'max-w-full self-center px-2 my-6 md:mb-16 md:mt-12 md:w-4/5 md:max-w-screen-lg',
          css`
            margin: 5% auto;
            margin: 5vmin auto;
          `
        )}
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
