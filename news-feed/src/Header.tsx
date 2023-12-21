// Header.tsx
import React from 'react';
import Navigation from './Navigation';
import './styles.css'

const Header: React.FC = () => {

    const refreshPage = () => {
        window.location.reload();
        };

  return (
    <div className='header__main'>
    <div onClick={refreshPage} className='logo_div'>
      <img className="logo" src="etracing.png" alt='reload'></img>
    </div>
    <Navigation />
  </div>
  );
};

export default Header;
