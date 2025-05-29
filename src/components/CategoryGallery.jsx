import { Link } from 'react-router';
import './css/CategoryGallery.css';
import { convertTagToCategory } from '../libs/posts';
import { useLanguageContext } from '../contexts/LanguageContext';

export default function CategoryGallery({ posts, tag }) {
  const langManager = useLanguageContext();
  return (
    <section className='cover'>
      <h1 className='cover__title'>
        {convertTagToCategory(tag, langManager.lang)}
      </h1>
      <div className='cover__items'>
        <ul className='article-list'>
          {Object.entries(posts).map(([postId, data]) => (
            <li className='article-item' key={postId}>
              <Link to={`/${postId}`} state={{ thumbnailPath: data.thumbnail }}>
                <div className='post-card'>
                  <div>
                    {data.thumbnail && (
                      <img
                        className='post-card__thumbnail'
                        src={data.thumbnail}
                        alt='Post thumbnail'
                      />
                    )}
                  </div>
                  <div className='post-card__title'>{data.title}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
