import './css/BlogList.css';
import CategoryGallery from '../components/CategoryGallery';
import { LATEST_POST_DAY } from '../../literal';
import { posts } from '../libs/posts';

export default function BlogList() {
  const latestPosts = getLatestPosts(posts);

  return (
    <>
      <CategoryGallery posts={latestPosts} tag={'new'} />
    </>
  );
}

function getLatestPosts(posts) {
  const latestPosts = {};
  Object.entries(posts).forEach(([index, data]) => {
    const diffDays = (Date.now() - data.date) / 1000 / 3600 / 24;
    if (diffDays < LATEST_POST_DAY + 1) {
      latestPosts[index] = posts[index];
    }
  });
  return latestPosts;
}
