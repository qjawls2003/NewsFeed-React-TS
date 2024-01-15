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
    const [ended, setEnded] = useState(false);


    useEffect(() => {
        //console.log("called")
        fetchData();
      }, [date]);

    const fetchData = async () => {
        try {
            if (count!==more) { //due to async calling effects multiple times at once
                return;
            }
            //setLoading(true);
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
                var url = s3 + wantedDate
                var response = await fetch(url);
                if (!response.ok) {
                    var newDate = new Date(date);
                    while (response.status === 403) {
                        
                        newDate.setDate(newDate.getDate()-1);
                        wantedDate = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate();
                        if (wantedDate === '2022-7-20') { //earliest article, terminate
                            setEnded(true);
                            return;
                        }
                        url = s3 + wantedDate
                        response = await fetch(url);
                    }
                    date = newDate;
                    setDay(newDate);            
                }
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
                
                //setLoading(false);
                
        } catch (error) {
            //console.error('Error fetching JSON:', error);
            
        }
    }

    const loadMore = async () => {
        batch = batch + 8;
        const newDate = new Date(date);
        newDate.setDate(date.getDate()-1);
        setdb(db);
        setDay(newDate);
        setMore((more)=>more+1);
        prev_count = db.length;
        await new Promise(resolve => setTimeout(resolve, 500));
        window.scrollTo({ top: window.scrollY+1000, behavior: 'smooth' });
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
        
        for (let i = 0; i < db.length ;i++) {
            elements.push(db[i].map((feed: Feed,index) => {
                return <SingleFeed key={feed.id} feed={feed} setNewsCard={setNewsCard} searched={searched}/>
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
                <div className='button'>
                    {!searched && !loading && loaded ? (
                        <button className='read-more-btn' ref={loadMorebutton} onClick={loadMore}>More Stories</button> 
                    ) :(null)
                    }
                    {searched && !loading && loaded ? (
                        <button className='read-more-btn' ref={reloadbutton} onClick={reload}>Reload Stories</button>
                    ) :(null)
                    } 
                    { loading && !ended ? (<div className='loader'></div>) : (null) }
                </div>
            </div>
        
        </div>
       

  )
}

export default NewsFeeds

