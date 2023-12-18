import React from 'react'
import { Feed } from '../model';
import db from '../content/test.json';
import SingleFeed from './SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
}
const NewsFeeds: React.FC<prop> = ({date,setDay}) => {
    const wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
    console.log(wantedDate); 

    return (
        <div className='items__list'>
        {db.articles.filter(item => item.date===wantedDate).map((feed: Feed) => (
                <SingleFeed feed={feed} date={date}/>))
        }
        </div>
  )
}

export default NewsFeeds


