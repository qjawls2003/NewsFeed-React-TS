import React, {useEffect,useRef} from 'react'
import { Feed } from '../model';

interface prop {
    newsCard:Feed,
    loading:boolean
}

const NewsCard: React.FC<prop> = ({newsCard, loading}) => {
  const cardRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (cardRef.current) {
        cardRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [newsCard]);

    const handleClick = () => {
        const newWindow = window.open(newsCard.source, '_blank');
        if (newWindow) {
        newWindow.focus();
        }
      };

    return (
      <div>{!loading ? (<div ref={cardRef} className='news__card' onClick={handleClick}>
      <h2 className='card__title'>{newsCard.title}</h2>
      <p className='card__date'>{newsCard.date_published}</p>
      <img className="card__image"  src={newsCard.imageURL}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "etracing.png";
            target.className = "card__image"
          }}
      />
      <p className='news__card__summary'>{newsCard.article}</p>
    </div>) : (<div></div>)}</div>
        
  )
}
export default NewsCard
