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
    const [showShadow, setShowShadow] = useState(false);

    const handleScroll = () => {
    // Set showShadow to true if scrolled down, false if at the top
      setShowShadow(window.scrollY > 0);
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    useEffect(() => {
      //console.log('Date has been updated:', date);      
    }, [date]);

    return (
      <div>
          <div className={showShadow ? 'top__search top__search__shadow' : 'top__search'}>
          <Search input={input} setInput={setInput} setdb={setdb} setNewsCard={setNewsCard} setSearched={setSearched} setLoading={setLoading} loading={loading}/>
          </div>
        <div className="container">
        <div className='column'>
            <NewsFeeds date={date} setDay={setDay} newsCard={newsCard} setNewsCard={setNewsCard} more={more} setMore={setMore} db={db} setdb ={setdb} searched={searched} setSearched={setSearched} loading={loading} setLoading={setLoading}/>
        </div>
        <div className='column__card'>
            <NewsCard newsCard={newsCard} loading={loading}/>
        </div>
      </div>
    </div>
    
      
    );
  }
  
  export default Home;
