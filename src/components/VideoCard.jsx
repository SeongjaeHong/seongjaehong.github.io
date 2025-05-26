import { Link } from 'react-router';
import './css/VideoCard.css';
import { useRef, useState } from 'react';

function VideoCard({ video, relatedVideos, mousePositionRef }) {
  const {
    channelId,
    channelTitle,
    description,
    publishedAt,
    title,
    thumbnails,
  } = video.snippet;
  const videoId = video.id;
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const monitorHoverRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);

    monitorHoverRef.current = setInterval(() => {
      const el = containerRef.current;
      const { x, y } = mousePositionRef.current;
      const elUnderMouse = document.elementFromPoint(x, y);
      if (el && !el.contains(elUnderMouse)) {
        handleMouseLeave();
      }
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (monitorHoverRef.current) {
      clearTimeout(monitorHoverRef.current);
      monitorHoverRef.current = null;
    }
    setIsHovered(false);
  };

  const eventHandlers = mousePositionRef
    ? {
        ref: containerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {};

  return (
    <Link
      to={{
        pathname: '/watch',
        search: 'v=' + videoId,
      }}
      state={{ channelId, description, relatedVideos, title }}
      className='video-card'
      {...eventHandlers}
    >
      <div className='video-thumbnail'>
        {!isHovered && <img src={thumbnails.high.url} alt={title} />}
        {isHovered && (
          <iframe
            src={
              'https://www.youtube.com/embed/' +
              videoId +
              '?autoplay=1&mute=1&controls=0&rel=0'
            }
            allow='autoplay;'
            title={title}
            style={{ pointerEvents: 'none' }}
          ></iframe>
        )}
      </div>
      <div className='video-info'>
        <p id='video-title'>{title}</p>
        <p id='video-channel'>{channelTitle}</p>
        <p id='video-created'>{ConvertTime(publishedAt)}</p>
      </div>
    </Link>
  );
}

export default VideoCard;

function ConvertTime(createdTime) {
  const _createdTime = new Date(createdTime);
  const timeDiff = Math.trunc((Date.now() - _createdTime.getTime()) / 1000);
  const min = Math.trunc(timeDiff / 60);
  const hour = Math.trunc(min / 60);
  const day = Math.trunc(hour / 24);
  const month = Math.trunc(day / 31);
  const year = Math.trunc(month / 12);

  if (min < 1) {
    return '방금 전';
  } else if (hour < 1) {
    return min + '분 전';
  } else if (day < 1) {
    return hour + '시간 전';
  } else if (month < 1) {
    return day + '일 전';
  } else if (year < 1) {
    return month + '달 전';
  } else {
    return year + '년 전';
  }
}
