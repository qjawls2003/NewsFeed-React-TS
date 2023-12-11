import React, { FormEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Feed } from './model';
import NewsFeeds from './components/NewsFeeds';


const App:React.FC = () => {
  const [date,setDay] = useState<Date>(new Date());

  const handleClick = (e:FormEvent) => {
    e.preventDefault();
    const newDate = new Date();
    newDate.setDate(date.getDate()-1);
    setDay(newDate);
    console.log(newDate);
  }

  useEffect(() => {
    // Your code that depends on the updated state
    console.log('Date has been updated:', date);
  }, [date]);

  return (
    <div className="App">
      <header className="header">
        Title: CyberNewsFeed
      </header>
      <div>
        <button onClick={handleClick}>Yesterday</button>
        <NewsFeeds date={date} setDay={setDay}/>
      </div>
    </div>
  );
}

export default App;
