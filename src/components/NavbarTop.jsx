import './css/NavBarTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NAME } from '../../literal';
import { useScreenContext } from '../contexts/ScreenContextProvider';
import { useEffect, useState } from 'react';

export default function NavBarTop({ openSidebar, openSidebarHandler }) {
  const mobile = useScreenContext();
  const [scroll, setScroll] = useState(false);
  const scrollHandler = () => {
    const targetY = window.innerHeight * 0.1 + 180;
    const curY = window.scrollY + 50;
    if (curY >= targetY) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <nav
      className={
        'navbar-top' + (mobile ? ' mobile' : '') + (scroll ? ' scroll' : '')
      }
    >
      <div className='gnb-left' onClick={openSidebarHandler}>
        <button className={'fc-button' + (openSidebar ? ' hide' : '')}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className='gnb-center'>
        <a href='/'>{NAME}</a>
      </div>
      {/* Dummy div to align gnb-center to the center */}
      <div className='gnb-right'></div>
    </nav>
  );
}
