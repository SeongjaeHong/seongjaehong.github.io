import { CATEGORIES, NAME } from '../../literal';
import { useLanguageContext } from '../contexts/LanguageContext';
import './css/NavBar.css';

export default function NavBar() {
  const langManager = useLanguageContext();
  langManager.lang = 'en';
  console.log(langManager.lang);
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
          {CATEGORIES.map((category) => (
            <li>{category[langManager.lang]}</li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
