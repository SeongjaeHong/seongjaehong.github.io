import './css/NavBarTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NAME } from '../../literal';
import { useScreenContext } from '../contexts/ScreenContextProvider';

export default function NavBarTop({ openSidebar, openSidebarHandler }) {
  const mobile = useScreenContext();

  return (
    <nav className={'navbar-top' + (mobile ? ' mobile' : '')}>
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
