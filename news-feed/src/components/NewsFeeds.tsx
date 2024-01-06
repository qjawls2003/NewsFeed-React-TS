import React , { useEffect, useState, useRef } from 'react'
import { Feed } from '../model';
import SingleFeed from './SingleFeed';

interface prop {
    date:Date;
    setDay:React.Dispatch<React.SetStateAction<Date>>;
    newsCard:Feed,
    setNewsCard:React.Dispatch<React.SetStateAction<Feed>>,
    more:number,
    setMore:React.Dispatch<React.SetStateAction<number>>,
    db:Feed[][],
    setdb: React.Dispatch<React.SetStateAction<Feed[][]>>,
    searched: boolean,
    setSearched: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

var newdb: Feed[][] = [];
const s3:string = 'https://etracingnews.s3.us-east-1.amazonaws.com/';
var count:number  = 0;
var prev_count:number = 0;
var itemCount:number  = 0;
var batch:number  = 8;
var loaded:boolean = false;

const NewsFeeds: React.FC<prop> = ({date,setDay, newsCard, setNewsCard, more, setMore, db, setdb, searched, setSearched, loading, setLoading}) => {
    const [jsonData, setJsonData] = useState<any | null>(null);
    const loadMorebutton = useRef<HTMLButtonElement>(null);
    const reloadbutton = useRef<HTMLButtonElement>(null);
    const [re, setRe] = useState(false);

    useEffect(() => {
        //console.log("called")
        fetchData();
      }, [date]);

    const fetchData = async () => {
        try {
            if (count!==more) { //due to async calling effects multiple times at once
                return;
            }
            setLoading(true);
            //console.log(re)
            if (re) {
                count = 0
                prev_count = 0
                itemCount = 0
                batch = 8
                setMore(0)
                newdb=[];
                setdb([]);
                setJsonData(null);
                setRe(false);
            }
                var wantedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
                count += 1;
                const url = s3 + wantedDate
                const response = await fetch(url);
                const data = await response.json()
                if (data.length > 0) {
                    newdb.push(data);
                    if (!loaded) {
                        //Set default NewsCard only the first time the page is loaded
                        const first = newdb[0].map((feed:Feed,index) => {
                            if (index===0) {
                                return feed;
                            } else {
                                return;
                            }
                        });
                        loaded = true;
                        const newsCard_first:Feed= first[0]!;
                        setNewsCard(newsCard_first);
                    }; 
                    setdb(newdb)
                    setJsonData(data);
                    itemCount = itemCount + data.length;
                }
                
                if (itemCount < batch) { //this will loop until condition is met due to useEffect and changes in the date state.
                    const newDate = new Date(date);
                    newDate.setDate(date.getDate()-1);
                    setDay(newDate);
                    setMore((more)=>more+1);
                }
                
                setLoading(false);
                
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    }

    const loadMore = () => {
        batch = batch + 8;
        const newDate = new Date(date);
        newDate.setDate(date.getDate()-1);
        setdb(db);
        setDay(newDate);
        setMore((more)=>more+1);
        prev_count = db.length;
    }

    const reload = async () => {
        setdb([]);
        setSearched(false);
        const newDate = new Date();
        setDay(newDate);
        setRe(true);
        count -= 1;
        await new Promise(resolve => setTimeout(resolve, 500));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    const renderItems = (db: Feed[][]) => {
        const elements = []
        //console.log(db, count, more)
        var len_count  = 0
        for (let i = 0; i < db.length ;i++) {
            const diff = count - prev_count
            if (i >= prev_count) {
                len_count += db[i].length
            }
            
            elements.push(db[i].map((feed: Feed,index) => {
                var last = false; 
                if  (i===0){
                    last = false
                } else if (index === db[i].length-1){
                    last = true
                } else if (index===0 && index < db[i].length) {
                    last = false
                } 
                return <SingleFeed key={feed.id} feed={feed} setNewsCard={setNewsCard} searched={searched} last={last} count={len_count} re={re} setRe={setRe}/>
            }
          )
         )
        }
        
        
        return elements
    }
    
    return (
        <div>
            <div className='items__list'>
                {renderItems(db)}
            </div>
        <div>
            {!searched && !loading ? (
                <button className='read-more-btn' ref={loadMorebutton} onClick={loadMore}>More Stories</button> 
            ) :(
                null
            )
            }
            {searched && !loading ? (
                <button className='read-more-btn' ref={reloadbutton} onClick={reload}>Reload Stories</button>
            ) :(
                null
            )
            } 
            { loading ? (<p>Loading...</p>) : (null) }
        </div>
        </div>
       

  )
}

export default NewsFeeds

