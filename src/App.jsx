import { Outlet } from 'react-router';
import NavBarSide from './components/NavBarSide';
import './App.css';
import NavBarTop from './components/NavbarTop';

export default function App() {
  return (
    <>
      <NavBarTop />
      <NavBarSide />
      <Outlet />
    </>
  );
}
