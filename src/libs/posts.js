import { CATEGORIES } from '../../literal';

// TODO: Apply Lazy Loading for Pagination
const searchedPosts = import.meta.glob('../../posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const categories = new Object();
CATEGORIES.map((category) => {
  Object.assign(categories, { [category.tag]: { ...category, count: 0 } });
});

let title;
let tag;
let contents;
let thumbnail;
export const posts = new Object();
Object.entries(searchedPosts).map(([path, document], index) => {
  const fileName = path.split('/').pop().replace('.md', '');
  const match = document.match(
    /^# (.+)\r?\n(?:\r?\n)*@(\w+)\r?\n(?:\r?\n)*([\s\S]+)/m
  );
  const thumbnailMatch = document.match(
    /!\[[^\]]*\]\(([^)]+\.(?:png|jpg|jpeg))\)/i
  );

  if (thumbnailMatch) {
    thumbnail = thumbnailMatch[1];
  }
  if (match) {
    title = match[1];
    tag = match[2];
    contents = match[3];
  } else {
    title = fileName;
    tag = 'life';
    contents = document;
  }
  console.dir(categories);
  if (Object.prototype.hasOwnProperty.call(categories, tag)) {
    categories[tag].count += 1;
  } else {
    tag = 'life';
    categories[tag].count += 1;
  }

  Object.assign(posts, { [index]: { title, tag, contents, thumbnail } });
});
