import React from 'react'
import { Feed } from '../model';

interface prop {
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}

const NewsCard: React.FC<prop> = ({newsCard,setNewsCard}) => {
    

    const handleClick = () => {
        const newWindow = window.open(newsCard.source, '_blank');
        if (newWindow) {
        newWindow.focus();
        }
      };

    return (
        <div className='news__card' onClick={handleClick}>
          <h2 className='card__title'>{newsCard.title}</h2>
          <p className='card__date'>{newsCard.date_published}</p>
          <img className="news-image" src={newsCard.imageURL}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "etracing.png";
                target.className = "news-image"
              }}
          />
          <p className='news__card__summary'>{newsCard.article}</p>
          
        </div>
  )
}
export default NewsCard
