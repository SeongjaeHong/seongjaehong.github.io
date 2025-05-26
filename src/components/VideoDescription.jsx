import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './css/VideoDescription.css';

export default function VideoDescription(videoId) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const { description } = location.state;
  const buttonHandle = () => setIsExpanded(!isExpanded);

  useEffect(() => setIsExpanded(false), [videoId]);

  return (
    <section className='description'>
      <div className='description-inner'>
        {!isExpanded && (
          <div className='snippet' onClick={buttonHandle}>
            <span className='snippet-text'>
              {procDescriptionText(description)}
            </span>
            <button id='expand' onClick={buttonHandle}>
              더보기
            </button>
          </div>
        )}
        {isExpanded && (
          <div className='full-text'>
            <span hidden={!isExpanded}>{procDescriptionText(description)}</span>
            <button id='collapse' onClick={buttonHandle} hidden={!isExpanded}>
              간략히
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function procDescriptionText(description) {
  const urlRegex = /(https?:\/\/[^\s\\]+)/g;
  const parts = description.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a href={part} key={index}>
          {part}
        </a>
      );
    } else {
      //   return part.split('\n').map((subpart) => <span>{subpart}</span>);
      return <span key={index}>{part}</span>;
    }
  });
}
