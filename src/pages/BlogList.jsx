import { Link } from 'react-router';
import { posts } from '../libs/posts';

export default function BlogList() {
  return (
    <div className='prose mx-auto p-4'>
      <h1>-- 블로그 글 목록 --</h1>
      <ul>
        {Object.entries(posts).map(([postId, data]) => (
          <li key={postId}>
            <Link to={`/${postId}`}>{data.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
