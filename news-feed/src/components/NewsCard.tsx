import React from 'react'
import { Feed } from '../model';

interface prop {
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}

const NewsCard: React.FC<prop> = ({newsCard,setNewsCard}) => {
    
    return (
        <div className='news__card'>
          <h2>{newsCard.title}</h2>
          <p>{newsCard.date_published}</p>
          <p>{newsCard.article}</p>
        </div>
  )
}
export default NewsCard
