// TODO: Apply Lazy Loading for Pagination
const searchedPosts = import.meta.glob('../../posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const posts = new Object();
Object.entries(searchedPosts).map(([path, contents], index) => {
  const fileName = path.split('/').pop().replace('.md', '');
  const title = contents.match(/^# (.+)/)?.[1] || fileName; // Use 1st # tag as a title
  Object.assign(posts, { [index]: { title, contents } });
});
