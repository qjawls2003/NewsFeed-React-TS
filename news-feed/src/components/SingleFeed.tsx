import React, { FormEvent, useState } from 'react';import { Feed } from '../model'
import './styles.css'

interface props {
    feed:Feed,
    date:Date,
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>,
    more:number,
    setMore:React.Dispatch<React.SetStateAction<number>>
}

const SingleFeed:React.FC<props> = ({feed,date, newsCard, setNewsCard,more,setMore}) => {
  

  const displayNewsCard = () => {
    setNewsCard(feed);
  };

  return (
    <div className="news-summary" onClick={displayNewsCard}>
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
        </div>
      </div>
    </div>


  )
}

export default SingleFeed
