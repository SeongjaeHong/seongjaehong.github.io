import { createContext, useContext } from 'react';
import { LanguageManager } from '../libs/lang';

const LangContext = createContext();
const lang = new LanguageManager();

export default function LanguageContext({ children }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLanguageContext() {
  return useContext(LangContext);
}
