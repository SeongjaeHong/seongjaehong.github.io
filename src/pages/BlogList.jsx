import { Link } from 'react-router';
import { posts } from '../libs/posts';
import './css/BlogList.css';

export default function BlogList() {
  return (
    <main className='main'>
      <h1>-- 블로그 글 목록 --</h1>
      <ul>
        {Object.entries(posts).map(([postId, data]) => (
          <li key={postId}>
            <Link to={`/${postId}`}>{data.title}</Link>
          </li>
        ))}
        {[...Array(50)].map((_, index) => (
          <li key={'mock' + index}>mock item: {index + 1}</li>
        ))}
      </ul>
    </main>
  );
}
