import { useQuery } from '@tanstack/react-query';
import VideoCard from '../components/VideoCard';
import { useSearchParams } from 'react-router';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import './css/videos.css';
import { useEffect, useRef } from 'react';

function Videos() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search_keyword');
  const youtube = useYoutubeApi();
  const {
    isFetching,
    error,
    data: videos,
  } = useQuery({
    queryKey: ['videos', keyword],
    queryFn: () => youtube.searchVideo(keyword),
    staleTime: Infinity,
  });

  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className='videos'>
      {isFetching && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {videos && (
        <ul>
          {videos.map((video) => {
            if (!video.id) {
              // Some ids are undefined.
              return null;
            }
            return (
              <div key={video.id}>
                <VideoCard
                  video={video}
                  relatedVideos={videos}
                  mousePositionRef={mousePositionRef}
                  key={video.id}
                />
              </div>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Videos;
