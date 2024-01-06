import React, { useEffect, useRef } from 'react';import { Feed } from '../model'
import './styles.css'

interface props {
    feed:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>,
    searched: boolean,
}

const SingleFeed:React.FC<props> = ({feed,setNewsCard,searched}) => {
  const div = useRef<HTMLDivElement | null>(null);


  const displayNewsCard = () => {
    setNewsCard(feed);
  };

  return (
    <div className="news-summary" onClick={displayNewsCard} ref={div}>
      <img className="news-image" src={feed.imageURL}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "etracing.png";
                target.className = "news-image"
              }}
      />
      <div className="news-details">
        <div className="news-title-container">
          <h2 className="news-title">{feed.title}</h2>
          <p className="news-date">{feed.date_published}</p>
          { !searched ? (null):(<p className='news-date'>Search Score: {feed.score}</p>)}
          
        </div>
      </div>
    </div>


  )
}

export default SingleFeed
