import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import NewsFeeds from './components/NewsFeeds';
import { Link } from 'react-router-dom'; 
import NewsCard from './components/NewsCard';

const App:React.FC = () => {
  const [date,setDay] = useState<Date>(new Date());
  const [showNextButton, setShowNextButton] = useState<boolean>(false);
  const [showBackButton, setShowBackButton] = useState<boolean>(true);
  
  const handleClick = (e:FormEvent,type:string) => {
    e.preventDefault();
    const newDate = new Date();
    const curDate = new Date();
    if (type === 'Back'){
      newDate.setDate(date.getDate()-1);
      curDate.setDate(curDate.getDate()-7);
      console.log(curDate.toDateString())
      console.log(newDate.toDateString())
      if (curDate.toDateString() === newDate.toDateString()) {
        setShowBackButton(false);
        setDay(newDate);
      } else {
        setShowNextButton(true);
        setShowBackButton(true);
        setDay(newDate);
      }
    } else {
      newDate.setDate(date.getDate()+1);
      if (curDate.toDateString() === newDate.toDateString()) {
        setShowNextButton(false);
      }
      setShowBackButton(true);
      setDay(newDate);
    }
      
  }

  useEffect(() => {
    console.log('Date has been updated:', date);
  }, [date]);

  return (
    <div className="App">
      <div>
        {showNextButton &&<button onClick={(event)=>handleClick(event,'Next')}>Next</button>}
        {showBackButton &&<button onClick={(event)=>handleClick(event,'Back')}>Back</button>}
        <p className='date'>{date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()}</p>
      </div>
      <NewsFeeds date={date} setDay={setDay}/>
      <NewsCard/>
    </div>
  );
}

export default App;
