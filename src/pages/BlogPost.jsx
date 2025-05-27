import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { posts } from '../libs/posts';
import { useParams } from 'react-router';

export default function BlogPost() {
  const { postId } = useParams();
  const content = posts[postId]?.contents;

  if (!content) {
    return <div className='prose mx-auto p-4'>해당 글이 없습니다.</div>;
  }

  return (
    <div className='prose mx-auto p-4'>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
