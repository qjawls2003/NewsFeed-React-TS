import React from 'react'
import { Feed } from '../model';
import db from '../content/test.json';
import SingleFeed from './SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}
const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard}) => {
    
    return (
        <div className='items__list'>
        {db.map((feed: Feed) => (
                <SingleFeed feed={feed} date={date} newsCard={newsCard} setNewsCard={setNewsCard}/>))
        }
        </div>
  )
}

export default NewsFeeds


