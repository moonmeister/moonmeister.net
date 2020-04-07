import * as React from 'react';
import PropTypes from 'prop-types';

const LocaleContext = React.createContext();

function getLocale() {
  if (typeof window !== `undefined`) {
    return window?.navigator?.language;
  }

  return 'en-US';
}

const LocaleProvider = ({ children }) => {
  return (
    <LocaleContext.Provider value={getLocale()}>
      {children}
    </LocaleContext.Provider>
  );
};

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocaleContext, LocaleProvider };
