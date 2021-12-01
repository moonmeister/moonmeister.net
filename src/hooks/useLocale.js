import { createContext } from "react";
const LocaleContext = createContext();

function getLocale() {
  if (typeof window !== `undefined`) {
    return window?.navigator?.language;
  }

  return 'en-US';
}

const LocaleProvider = ({ children }) => (
  <LocaleContext.Provider value={getLocale()}>
    {children}
  </LocaleContext.Provider>
);

export { LocaleContext, LocaleProvider };
