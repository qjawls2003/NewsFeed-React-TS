import React , { useEffect, useState, useRef } from 'react'
import { Feed } from './model';
import SingleFeed from './components/SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>,
    more:number,
    setMore:React.Dispatch<React.SetStateAction<number>>
}

var db: Feed[][] = [];
const s3 = 'https://blognewsarticles.s3.us-east-2.amazonaws.com/';
var count = 0;
var itemCount = 0;

const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard, more, setMore}) => {
    const [jsonData, setJsonData] = useState<any | null>(null);
    const loadMorebutton = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        async function fetchData() {
        var wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
          try {
            if (count!==more) { //due to async calling effects multiple times at once
                return;
            }
            count += 1;
            const url = s3 + wantedDate
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json()
                if (data.length > 0) {
                    //console.log(data.length);
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
                    db.push(data);
                    setJsonData(data);
            }
        }
        //when there are too few items for today
        while (count === 1 && db[0].length < 5) {
            loadMorebutton.current?.click();
        }
        //Set default NewsCard
        if (db.length > 0) {
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
        const newDate = new Date();
        newDate.setDate(date.getDate()-1);
        setDay(newDate);
        setMore((more)=>more+1);
        clickCount++
    }
    const renderItems = (db: Feed[][]) => {
        itemCount = 0;
        const elements = []
        for (let i = 0; i < db.length ;i++) {
            itemCount = itemCount + db[i].length;
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

