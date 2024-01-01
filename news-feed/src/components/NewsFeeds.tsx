import React , { useEffect, useState, useRef } from 'react'
import { Feed } from '../model';
import SingleFeed from './SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>,
    more:number,
    setMore:React.Dispatch<React.SetStateAction<number>>
}

var db: Feed[][] = [];
const s3:string = 'https://blognewsarticles.s3.us-east-2.amazonaws.com/';
var count:number  = 0;
var itemCount:number  = 0;
var batch:number  = 8;
var loaded:boolean = false;

const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard, more, setMore}) => {
    const [jsonData, setJsonData] = useState<any | null>(null);
    const loadMorebutton = useRef<HTMLButtonElement>(null);

    const countDB = (dataLen:number) => {
        itemCount = itemCount + dataLen;
    }
    useEffect(() => {
        async function fetchData() {
          try {
            if (count!==more) { //due to async calling effects multiple times at once
                return;
            }
                var wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
                count += 1;
                const url = s3 + wantedDate
                const response = await fetch(url);
                const data = await response.json()
                if (data.length > 0) {
                    db.push(data);
                    setJsonData(data);
                    countDB(data.length);
                } 
                if (itemCount < batch) {
                    const newDate = new Date(date);
                    newDate.setDate(date.getDate()-1);
                    setDay(newDate);
                    setMore((more)=>more+1);
                } else {
                    loaded = true;
                }

        //Set default NewsCard
        if (db.length > 0 && !loaded) {
            const first = db[0].map((feed:Feed,index) => {
                if (index===0) {
                    return feed;
                } else {
                    return;
                }
            });
            const newsCard_first:Feed= first[0]!;
            setNewsCard(newsCard_first);
        };
        
          } catch (error) {
            console.error('Error fetching JSON:', error);
          }
        }
    
        fetchData();
      }, [date]);

    var clickCount = 0;
    const loadMore = () => {
        batch = batch + 8;
        const newDate = new Date(date);
        newDate.setDate(date.getDate()-1);
        setDay(newDate);
        setMore((more)=>more+1);
    }
    const renderItems = (db: Feed[][]) => {
        const elements = []
        for (let i = 0; i < db.length ;i++) {
            elements.push(db[i].map((feed: Feed) => (
                <SingleFeed key={feed.id} feed={feed} date={date} newsCard={newsCard} setNewsCard={setNewsCard} more={more} setMore={setMore}/>))
            )
        }
        
        return elements
    }
    
    
    return (
        <div className='items__list'>
        {renderItems(db)}
        <button className='read-more-btn' ref={loadMorebutton} onClick={loadMore}>More Stories</button>
        </div>
  )
}

export default NewsFeeds

