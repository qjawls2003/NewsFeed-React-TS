import React, { useState } from 'react';import { Feed } from '../model'
import './styles.css'

interface props {
    feed:Feed
    date:Date
}

const SingleFeed:React.FC<props> = ({feed,date}) => {
  const [isExpanded,setIsExpanded] = useState<boolean>(false);
  
  return (
    <div className="news-summary">
      <img className="news-image" src={feed.imageURL} alt="News Image"/>
      <div className="news-text-container">
        <h2 className="news-title">{feed.title}</h2>
        <p className="news-date">{feed.date}</p>
        <a href="#" className="read-more">Read More</a>
      </div>
    </div>


  )
}

export default SingleFeed
