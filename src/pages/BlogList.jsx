import { Link } from 'react-router';
import { getPostList } from '../lib/posts';

export default function BlogList() {
  const posts = getPostList();

  return (
    <div className='prose mx-auto p-4'>
      <h1>블로그 글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className='text-blue-600'>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
