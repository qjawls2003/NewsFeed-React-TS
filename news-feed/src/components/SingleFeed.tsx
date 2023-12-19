import React, { FormEvent, useState } from 'react';import { Feed } from '../model'
import './styles.css'

interface props {
    feed:Feed,
    date:Date,
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}

const SingleFeed:React.FC<props> = ({feed,date, newsCard, setNewsCard}) => {
  

  const displayNewsCard = () => {
    setNewsCard(feed);
  };

  return (
    <div className="news-summary" onClick={displayNewsCard}>
      <img className="news-image" src={feed.imageURL} alt="News" />
      <div className="news-details">
        <div className="news-title-container">
          <h2 className="news-title">{feed.title}</h2>
          <p className="news-date">{feed.date_published}</p>
        </div>
      </div>
    </div>


  )
}

export default SingleFeed
