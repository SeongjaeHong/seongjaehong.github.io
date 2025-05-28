import { Link } from 'react-router';
import { posts } from '../libs/posts';
import './css/BlogList.css';

export default function BlogList() {
  return (
    <>
      <section className='cover'>
        <h1 className='cover__title'>최신 글</h1>
        <div className='cover__items'>
          <ul className='article-list'>
            {Object.entries(posts).map(([postId, data]) => (
              <li className='article-item' key={postId}>
                <Link
                  to={`/${postId}`}
                  state={{ thumbnailPath: data.thumbnail }}
                >
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
    </>
  );
}
