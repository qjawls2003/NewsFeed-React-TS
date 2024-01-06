import React, { useEffect, useState } from 'react';
import NewsFeeds from './NewsFeeds';
import NewsCard from './NewsCard';
import { Feed } from '../model';
import Search from './Search';
import userEvent from '@testing-library/user-event';

const defaultFeed: Feed = {
  id: 0,
  date_published: '',
  title: '',
  article: '',
  imageURL: '',
  source: '',
  score: 0
}


const Home:React.FC = () => {
    const [date,setDay] = useState<Date>(new Date());
    const [newsCard, setNewsCard] =useState<Feed>(defaultFeed);
    const [more, setMore] = useState<number>(0);
    const [db, setdb] = useState<Feed[][]>([]);
    const [input,setInput] = useState<string>("");
    const [searched, setSearched] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      //console.log('Date has been updated:', date);      
    }, [date]);

    return (
      <div>
          <div className='top__search'>
          <Search input={input} setInput={setInput} setdb={setdb} setNewsCard={setNewsCard} setSearched={setSearched} setLoading={setLoading}/>
          </div>
        <div className="container">
        <div className='column'>
            <NewsFeeds date={date} setDay={setDay} newsCard={newsCard} setNewsCard={setNewsCard} more={more} setMore={setMore} db={db} setdb ={setdb} searched={searched} setSearched={setSearched} loading={loading}/>
        </div>
        <div className='column__card'>
            <NewsCard newsCard={newsCard} setNewsCard={setNewsCard}/>
        </div>
      </div>
      </div>
    
      
    );
  }
  
  export default Home;
