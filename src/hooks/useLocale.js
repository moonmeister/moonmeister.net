import * as React from 'react';
import PropTypes from 'prop-types';

const LocaleContext = React.createContext();

function getLocale() {
  return window?.navigator?.language ?? 'en-US';
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
