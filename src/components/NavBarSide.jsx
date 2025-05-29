import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NAME } from '../../literal';
import { useLanguageContext } from '../contexts/LanguageContext';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons/faSquareGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { useEffect, useRef, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useScreenContext } from '../contexts/ScreenContextProvider';
import './css/NavBarSide.css';
import { categories } from '../libs/posts';
import { Link } from 'react-router';

export default function NavBarSide({ openSidebar, openSidebarHandler }) {
  const mobile = useScreenContext();
  const langManager = useLanguageContext();
  const navbarRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [scrollVisible, setScrollVisible] = useState(false);
  const wheelHandler = () => {
    setScrollVisible(true);
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = setTimeout(() => {
      setScrollVisible(false);
    }, 1000);
  };

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;
    navbar.addEventListener('wheel', wheelHandler);
    return () => {
      navbar.removeEventListener('wheel', wheelHandler);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const [position, setPosition] = useState('static');
  useEffect(() => {
    if (openSidebar) {
      setPosition('fixed');
    } else {
      setTimeout(() => {
        setPosition('static');
      }, 500);
    }
  }, [openSidebar]);

  return (
    <aside
      className={
        'navbar-side' +
        (scrollVisible ? ' show-scrollbar' : '') +
        (mobile ? ' mobile' : '') +
        (openSidebar ? ' show' : '')
      }
      ref={navbarRef}
    >
      <section className='navbar__header'>
        <a href='/' className='navbar__header__title'>
          <p className='navbar__header__title__inner'>{NAME}</p>
        </a>
      </section>
      <section className={'sub-navigation ' + position}>
        <button
          id='close-subNavigation'
          className={'fc-button' + (openSidebar ? ' show' : ' hide')}
          onClick={openSidebarHandler}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <button id='transparent-button' onClick={openSidebarHandler}>
          사이드바 닫기
        </button>
        <div className='side-bar'>
          <section className='category'>
            <ul>
              {Object.entries(categories).map(([tag, data], index) => (
                <li key={`category__${index}`}>
                  <Link to={`/category?tag=${tag}`}>
                    <span id='category__title'>{data[langManager.lang]}</span>
                    <span id='count'> ({data.count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className='external-link'>
            <a
              className='external-link__icon'
              href='http://github.com/SeongjaeHong/'
              target='_blank'
            >
              <FontAwesomeIcon icon={faSquareGithub} />
            </a>
            <a
              className='external-link__icon'
              href='https://www.linkedin.com/in/sj-hong/'
              target='_blank'
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </section>
        </div>
      </section>
    </aside>
  );
}
