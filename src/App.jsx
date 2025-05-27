import { Outlet } from 'react-router';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
