import React from 'react'
import { Feed } from '../model';

interface prop {
    input:string,
    setInput:React.Dispatch<React.SetStateAction<string>>,
    db:Feed[][],
    setdb: React.Dispatch<React.SetStateAction<Feed[][]>>
  }
const Search: React.FC<prop> = ({input,setInput,db,setdb}) => {
    const placeholder = "Work in progress...";

    const handleSubmit = (event: any | undefined) => {
        event.preventDefault(); // Preventing the default form submission behavior
        submitResponse(input);
    };

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setInput(value);
      };
    
      const submitResponse = async (input:string) => {
        console.log(input);
        //setdb([]);
        setInput(""); //restore search box to default
      }

    return (
        <div className='search'>
            <form onSubmit={handleSubmit} className='transparent'>
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
             </form>
        </div>
        
    )
}

export default Search
