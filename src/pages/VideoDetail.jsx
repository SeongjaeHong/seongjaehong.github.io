import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';
import './css/VideoDetail.css';
import VideoCard from '../components/VideoCard';
import VideoDescription from '../components/VideoDescription';

function VideoDetail() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const location = useLocation();
  const youtube = useYoutubeApi();
  const { channelId, relatedVideos, title } = location.state;
  const {
    error,
    isFetching,
    data: channel,
  } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtube.searchChannel(channelId),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  return (
    <section className='column'>
      <main>
        <section className='video-frame'>
          <iframe
            src={'https://www.youtube.com/embed/' + videoId}
            frameborder='0'
            title={title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerpolicy='strict-origin-when-cross-origin'
            allowfullscreen
          ></iframe>
        </section>

        <section className='channel-info'>
          {(isFetching || error) && (
            <img src={null} style={{ display: 'none' }} />
          )}
          {channel && (
            <>
              <img src={channel.snippet.thumbnails.default.url} />
              <span>{channel.snippet.title}</span>
            </>
          )}
        </section>
        <VideoDescription videoId={videoId} />
      </main>
      <aside>
        {relatedVideos.map((video) => {
          if (video.id === videoId) {
            return null;
          }
          return (
            <VideoCard
              video={video}
              relatedVideos={relatedVideos}
              key={video.id}
            />
          );
        })}
      </aside>
    </section>
  );
}

export default VideoDetail;
