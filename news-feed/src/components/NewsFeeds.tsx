import React , { useEffect, useState } from 'react'
import { Feed } from '../model';
import SingleFeed from './SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}

var db: Feed[][] = [];
const s3 = 'https://blognewsarticles.s3.us-east-2.amazonaws.com/';
const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard}) => {
    const [jsonData, setJsonData] = useState<any | null>(null);
    useEffect(() => {
        async function fetchData() {
        var wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        console.log(wantedDate);
          try {
            const url = s3 + wantedDate
            const response = await fetch(url);
            console.log(response);
            if (response.ok) {
                const data = await response.json()
                if (data.length > 0) {
                    console.log(data.length);
                    db.push(data);
                    setJsonData(data);
                } else { //when you are at next day and there are no new articles
                    console.log("Today not Found")
                    const curDate = new Date();
                    curDate.setDate(date.getDate()-1);
                    const yesterday = curDate.getFullYear() + "-" + (curDate.getMonth()+1) + "-" + curDate.getDate();
                    const url = s3 + yesterday
                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json()
                        console.log(data.length);
                        console.log(data);
                        db.push(data);
                        setJsonData(data);
                }
            } 
            } else {
                console.log("Today not Found")
                const curDate = new Date();
                curDate.setDate(date.getDate()-1);
                const yesterday = curDate.getFullYear() + "-" + (curDate.getMonth()+1) + "-" + curDate.getDate();
                const url = s3 + yesterday
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json()
                    console.log(data.length);
                    console.log(data);
                    db.push(data);
                    setJsonData(data);
            }
        }
          } catch (error) {
            console.error('Error fetching JSON:', error);
          }
        }
    
        fetchData();
      }, [date]);
    
    
    const loadMore = () => {
        const newDate = new Date();
        newDate.setDate(date.getDate()-1);
        setDay(newDate);
    }
    const renderItems = (db: Feed[][]) => {
        const elements = []
        for (let i = 0; i < db.length ;i++) {
            elements.push(db[i].map((feed: Feed) => (
                <SingleFeed feed={feed} date={date} newsCard={newsCard} setNewsCard={setNewsCard}/>))
            )
        }
        return elements
    }

    return (
        <div className='items__list'>
        {renderItems(db)}
        <button className='read-more-btn' onClick={loadMore}>More Stories</button>
        </div>
  )
}

export default NewsFeeds


