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
          <h2>{newsCard.title}</h2>
          <p>{newsCard.date_published}</p>
          <p className='news__card__summary'>{newsCard.article}</p>
        </div>
  )
}
export default NewsCard
