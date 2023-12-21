import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const Navigation: React.FC = () => {
  return (
    <div className='header'>
    <nav>
      <ul>
        <li>
          <Link to="https://medium.com/etracing/building-an-automated-news-website-4f17abdd2c81" target="_blank" rel="noopener noreferrer">About</Link>
        </li>
        <li>
          <Link to="https://github.com/qjawls2003" target="_blank" rel="noopener noreferrer">Github</Link>
        </li>
        <li>
          <Link to="https://www.linkedin.com/in/daniel-beom-an/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        </li>
        <li>
          <Link to="https://medium.com/etracing" target="_blank" rel="noopener noreferrer">Medium</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navigation;
