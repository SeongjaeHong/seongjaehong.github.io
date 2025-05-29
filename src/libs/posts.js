import { CATEGORIES } from '../../literal';

export let categories = {};
export let posts = {};

// TODO: Apply Pagination thingy
export const searchedPosts = import.meta.glob('../../posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

if (!localStorage.getItem('searchedPosts')) {
  setSearchPostsCache();
} else {
  const cachedSearchPosts = localStorage.getItem('searchedPosts');
  if (JSON.stringify(searchedPosts) === cachedSearchPosts) {
    // Use cache
    posts = JSON.parse(localStorage.getItem('posts'));
    categories = JSON.parse(localStorage.getItem('categories'));
  } else {
    // Update cache
    setSearchPostsCache();
  }
}

function setSearchPostsCache() {
  localStorage.setItem('searchedPosts', JSON.stringify(searchedPosts));
  setPosts();
  localStorage.setItem('posts', JSON.stringify(posts));
  localStorage.setItem('categories', JSON.stringify(categories));
}

function compareFn(path1, path2) {
  // Sort paths from the latest to the oldest post
  let p1 = path1.split('/').pop().split('-');
  let p2 = path2.split('/').pop().split('-');
  p1 = [p1[0], p1[1], p1[2]].join('');
  p2 = [p2[0], p2[1], p2[2]].join('');
  return p2 - p1;
}

function setPosts() {
  console.log('hi: ', Date.now());
  let sortedPath = Object.keys(searchedPosts);
  sortedPath.sort(compareFn);

  for (const category of CATEGORIES) {
    categories[category.tag] = { ...category, count: 0 };
  }

  let title;
  let tag;
  let contents;
  let thumbnail;
  let date;
  for (const [index, path] of sortedPath.entries()) {
    const fileName = path.split('/').pop().replace('.md', '');
    const document = searchedPosts[path];
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

    if (Object.prototype.hasOwnProperty.call(categories, tag)) {
      categories[tag].count += 1;
    } else {
      tag = 'life';
      categories[tag].count += 1;
    }

    date = fileName.split('-');
    date = [date[0], date[1], date[2]].join('-');

    posts[index] = { title, tag, contents, thumbnail, date };
  }
}

export function convertTagToCategory(tag, lang = 'kr') {
  if (tag === 'new') {
    return lang === 'kr' ? '최신 글' : 'Latest';
  }

  for (const category of CATEGORIES) {
    if (category.tag === tag) {
      return category[lang];
    }
  }
}
