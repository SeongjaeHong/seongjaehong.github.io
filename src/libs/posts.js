// TODO: Apply Lazy Loading for Pagination
const searchedPosts = import.meta.glob('../../posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

let title;
export const posts = new Object();
Object.entries(searchedPosts).map(([path, contents], index) => {
  const fileName = path.split('/').pop().replace('.md', '');
  const match = contents.match(/^# (.+)\r?\n([\s\S]+)/m);

  if (match) {
    title = match[1];
    contents = match[2];
  } else {
    title = fileName;
  }
  Object.assign(posts, { [index]: { title, contents } });
});
