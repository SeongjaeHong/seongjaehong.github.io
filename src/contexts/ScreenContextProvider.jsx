import { createContext, useContext, useEffect, useState } from 'react';

const ScreenContext = createContext();
export default function ScreenContextProvider({ children }) {
  const [mobile, setMobile] = useState(false);
  const windowResizeHandler = () => {
    if (document.body.clientWidth <= 700) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };

  useEffect(() => {
    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler);
    return () => {
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, []);

  return (
    <ScreenContext.Provider value={mobile}>{children}</ScreenContext.Provider>
  );
}

export function useScreenContext() {
  return useContext(ScreenContext);
}
