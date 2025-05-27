// 모든 .md 파일을 문자열로 불러옴
export const posts = import.meta.glob('../../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// 파일 이름을 slug로 바꾸는 함수
export const getPostList = () => {
  return Object.entries(posts).map(([path, content]) => {
    const slug = path.split('/').pop().replace('.md', '');

    const title = content.match(/^# (.+)/)?.[1] || slug;

    return {
      slug,
      title,
      content,
    };
  });
};
