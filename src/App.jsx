import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import './App.css';

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
