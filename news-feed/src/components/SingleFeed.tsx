import React from 'react'
import { Feed } from '../model'

interface props {
    feed:Feed
    date:Date
}

const SingleFeed:React.FC<props> = ({feed,date}) => {
  const wantedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
  console.log(wantedDate); 
  return (
    <div>
      <p>{feed.title} Posted: {feed.date}</p>
    </div>
  )
}

export default SingleFeed
