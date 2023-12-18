import React, { useState } from 'react';import { Feed } from '../model'
import './styles.css'

interface props {
    feed:Feed
    date:Date
}

const SingleFeed:React.FC<props> = ({feed,date}) => {
  const [isReadMoreVisible, setReadMoreVisible] = useState(false);

  const handleReadMoreClick = () => {
    setReadMoreVisible(!isReadMoreVisible);
  };
  return (
    <div className="news-summary">
      <img className="news-image" src={feed.imageURL} alt="News" />
      <div className="news-details">
        <div className="news-title-container">
          <h2 className="news-title">{feed.title}</h2>
          <p className="news-date">{feed.date}</p>
        </div>
        <a href="#" className="read-more" onClick={handleReadMoreClick}>
          {isReadMoreVisible ? 'Read Less' : 'Read More'}
        </a>
        {isReadMoreVisible && (
          <p className="read-more-text">
            Extended news text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Extended news text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Extended news text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Extended news text goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        )}
      </div>
    </div>


  )
}

export default SingleFeed
