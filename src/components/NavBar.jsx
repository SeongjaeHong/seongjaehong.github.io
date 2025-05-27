import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CATEGORIES, NAME } from '../../literal';
import { useLanguageContext } from '../contexts/LanguageContext';
import './css/NavBar.css';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons/faSquareGithub';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';

export default function NavBar() {
  const langManager = useLanguageContext();
  return (
    <aside className='navbar'>
      <div className='navbar__scrollbar' hidden={true}>
        <div className='navbar__scrollbar__inner' />
      </div>
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
