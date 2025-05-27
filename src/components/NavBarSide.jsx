import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CATEGORIES, NAME } from '../../literal';
import { useLanguageContext } from '../contexts/LanguageContext';
import './css/NavBarSide.css';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons/faSquareGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { useEffect, useRef, useState } from 'react';

export default function NavBarSide() {
  const langManager = useLanguageContext();
  const navbarRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [scrollVisible, setScrollVisible] = useState(false);
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const wheelHandler = () => {
      setScrollVisible(true);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = setTimeout(() => {
        setScrollVisible(false);
      }, 1000);
    };
    navbar.addEventListener('wheel', wheelHandler);

    return () => {
      navbar.removeEventListener('wheel', wheelHandler);
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <aside
      className={`navbar ${scrollVisible ? 'show-scrollbar' : ''}`}
      ref={navbarRef}
    >
      <section className='navbar__header'>
        <a href='/' className='navbar__header__title'>
          <p className='navbar__header__title__inner'>{NAME}</p>
        </a>
      </section>
      <section className='category'>
        <ul>
          {CATEGORIES.map((category, index) => (
            <li key={`category_${index}`}>{category[langManager.lang]}</li>
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
    </aside>
  );
}
