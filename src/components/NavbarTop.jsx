import './css/NavBarTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NAME } from '../../literal';
import { useState } from 'react';

export default function NavBarTop() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const openSidebarHandler = () => {
    setOpenSidebar(!openSidebar);
  };
  return (
    <>
      <nav className='navbar-top'>
        <div className='gnb-left' onClick={openSidebarHandler}>
          <button className={'fc-button ' + (openSidebar ? 'hide' : '')}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className='gnb-center'>
          <a href='/'>{NAME}</a>
        </div>
        {/* Dummy div to align gnb-center to the center */}
        <div className='gnb-right'></div>
      </nav>
      <div className='sidebar-contents'>
        <div className='sub-navigation'>
          <button
            id='close-sidebar'
            className={'fc-button ' + (openSidebar ? 'show' : 'hide')}
            onClick={openSidebarHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </>
  );
}
