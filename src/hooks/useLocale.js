import * as React from 'react';

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

export { LocaleContext, LocaleProvider };
