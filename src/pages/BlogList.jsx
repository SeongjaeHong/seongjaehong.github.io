import './css/BlogList.css';
import CategoryGallery from '../components/CategoryGallery';
import { LATEST_POST_DAY } from '../../literal';
import { posts } from '../libs/posts';

export default function BlogList() {
  return (
    <>
      <CategoryGallery posts={getLatestPosts()} tag={'new'} />
    </>
  );
}

function getLatestPosts() {
  const latestPosts = {};
  Object.entries(posts).forEach(([index, data]) => {
    const diffDays = (Date.now() - Date.parse(data.date)) / 1000 / 3600 / 24;
    console.log(diffDays);
    if (diffDays < LATEST_POST_DAY + 1) {
      latestPosts[index] = posts[index];
    }
  });
  return latestPosts;
}
