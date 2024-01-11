import React, { useRef } from 'react'
import { Feed } from '../model';

interface prop {
    input:string,
    setInput:React.Dispatch<React.SetStateAction<string>>,
    setdb: React.Dispatch<React.SetStateAction<Feed[][]>>,
    setNewsCard: React.Dispatch<React.SetStateAction<Feed>>,
    setSearched: React.Dispatch<React.SetStateAction<boolean>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean
  }
var newdb:Feed[][] = [];
var loaded:boolean = false;

const Search: React.FC<prop> = ({input,setInput,setdb,setNewsCard, setSearched, setLoading, loading}) => {
    const placeholder = "Perform a Vector Search";
    const url = "https://etracingnews.com/search/"
    const controllerRef = useRef(new AbortController());
    
    const handleSubmit = (event: any | undefined) => {
        event.preventDefault(); // Preventing the default form submission behavior
        submitResponse(input);
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setInput(value);
      };
    
      const submitResponse = async (input:string) => {
        loaded = false;
        console.log(input);
        //setdb([]);
        setInput(""); //restore search box to default
        setLoading(true);
        setdb([]);
        try {
            const response = await fetch(url,
                {
                    method: 'POST',
                    headers:new Headers({
                        'Content-Type': 'application/json'
                    }),
                    body: JSON.stringify({"query": input}),
                    signal: controllerRef.current.signal
                });
            const data = await response.json()
                if (data.length > 0) {
                    setSearched(true);
                    const sorted_data_list = JSON.parse(data)
                    const sorted_data = sorted_data_list.sort((a:any,b:any) => b.score - a.score)
                    newdb.push(sorted_data);
                    if (!loaded) {
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
                }
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                newdb = [];
        } catch (error) {
            if (error === 'AbortError') {
                console.log('Request was aborted');
              } else {
                console.error('Error fetching data:', error);
              }
            }
      }

    return (
        <div className='search'>
            {!loading ? (<form onSubmit={handleSubmit} className='transparent'>
                <div>
                    <input
                    className="search__input"
                    placeholder={placeholder}
                    value={input}
                    onChange={handleChange}
                    required
                    name='input'
                    />
                    <button className="search__button" type='submit'>
                        <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g>
                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                            </g>
                        </svg>
                    </button>
                </div>
             </form>):(null)}
            
        </div>
        
    )
}

export default Search
