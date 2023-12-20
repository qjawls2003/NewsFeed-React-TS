import React , { useEffect, useState } from 'react'
import { Feed } from '../model';
import SingleFeed from './SingleFeed';
import { fetchJsonFromS3 } from './S3service';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>
}

var db: Feed[][] = [];

const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard}) => {
    const [jsonData, setJsonData] = useState<any | null>(null);
    useEffect(() => {
        async function fetchData() {
        var wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
          try {
            const data = await fetchJsonFromS3({
              bucketName: 'blognewsarticles',
              key: wantedDate,
            });
            db.push(data);
            setJsonData(data);
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
        <button onClick={loadMore}>Read More</button>
        </div>
  )
}

export default NewsFeeds


