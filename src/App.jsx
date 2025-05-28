import { Outlet } from 'react-router';
import NavBarSide from './components/NavBarSide';
import NavBarTop from './components/NavbarTop';
import { useEffect, useState } from 'react';
import { useScreenContext } from './contexts/ScreenContextProvider';
import './App.css';

export default function App() {
  const mobile = useScreenContext();
  const [openSidebar, setOpenSidebar] = useState(false);
  const openSidebarHandler = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    if (!mobile) {
      setOpenSidebar(false);
    }
  }, [mobile]);

  return (
    <>
      <NavBarTop
        openSidebar={openSidebar}
        openSidebarHandler={openSidebarHandler}
      />
      <NavBarSide
        openSidebar={openSidebar}
        openSidebarHandler={openSidebarHandler}
      />
      <main className={mobile ? ' mobile' : ''}>
        <Outlet />
      </main>
    </>
  );
}
