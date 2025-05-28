import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { posts } from '../libs/posts';
import { useLocation, useParams } from 'react-router';
import './css/BlogPost.css';

export default function BlogPost() {
  const { postId } = useParams();
  const title = posts[postId]?.title;
  const content = posts[postId]?.contents;
  const location = useLocation();
  const thumbnailPath = location.state?.thumbnailPath;

  if (!content) {
    return <div className='mx-auto p-4'>해당 글이 없습니다.</div>;
  }

  return (
    <>
      <header
        className='contents-cover'
        style={{
          backgroundImage: `url(${thumbnailPath})`,
          backgroundSize: 'cover',
        }}
      >
        <h1 className='headline'>{title}</h1>
      </header>
      <section className='contents'>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </section>
    </>
  );
}
