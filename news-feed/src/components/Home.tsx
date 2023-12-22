import React, { useEffect, useState } from 'react';
import NewsFeeds from './NewsFeeds';
import NewsCard from './NewsCard';
import { Feed } from '../model';


const defaultFeed: Feed = {
    id: 0,
    date_published:'',
    title: '',
    article:'',
    imageURL:'',
    source:'',
  }

const Home:React.FC = () => {
    const [date,setDay] = useState<Date>(new Date());
    const [newsCard, setNewsCard] =useState<Feed>(defaultFeed);
    const [more, setMore] = useState<number>(0);
    useEffect(() => {
      console.log('Date has been updated:', date);
    }, [date]);
    
    return (
    <div className="container">
        <div className='column'>
            <NewsFeeds date={date} setDay={setDay} newsCard={newsCard} setNewsCard={setNewsCard} more={more} setMore={setMore}/>
        </div>
        <div className='column__card'>
            <NewsCard newsCard={newsCard} setNewsCard={setNewsCard}/>
        </div>
      </div>
      
    );
  }
  
  export default Home;
