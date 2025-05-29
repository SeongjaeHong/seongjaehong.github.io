import { useSearchParams } from 'react-router';
import { posts } from '../libs/posts';
import { useEffect, useState } from 'react';
import CategoryGallery from '../components/CategoryGallery';

export default function CategoryList() {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const [categoryPosts, setCategoryPosts] = useState({});

  useEffect(() => {
    if (!tag) return;

    const filtered = {};
    Object.entries(posts).map(([key, post]) => {
      if (post.tag === tag) {
        filtered[key] = post;
      }
    });
    setCategoryPosts(filtered);
  }, [tag]);

  return (
    <>
      <CategoryGallery posts={categoryPosts} tag={tag} />
    </>
  );
}
