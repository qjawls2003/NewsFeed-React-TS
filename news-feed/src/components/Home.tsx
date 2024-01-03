import React, { useEffect, useState } from 'react';
import NewsFeeds from './NewsFeeds';
import NewsCard from './NewsCard';
import { Feed } from '../model';
import Search from './Search';

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
    const [db, setdb] = useState<Feed[][]>([]);
    const [input,setInput] = useState<string>("");

    useEffect(() => {
      //console.log('Date has been updated:', date);
    }, [date]);

    return (
      <div>
          <div className='top__search'>
          <Search input={input} setInput={setInput} db={db} setdb={setdb}/>
          </div>
        <div className="container">
        <div className='column'>
            <NewsFeeds date={date} setDay={setDay} newsCard={newsCard} setNewsCard={setNewsCard} more={more} setMore={setMore} db={db} setdb ={setdb}/>
        </div>
        <div className='column__card'>
            <NewsCard newsCard={newsCard} setNewsCard={setNewsCard}/>
        </div>
      </div>
      </div>
    
      
    );
  }
  
  export default Home;
