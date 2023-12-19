import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="https://github.com/qjawls2003" target="_blank" rel="noopener noreferrer">Github</Link>
        </li>
        <li>
          <Link to="https://www.linkedin.com/in/daniel-beom-an/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
