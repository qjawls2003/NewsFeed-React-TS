import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './components/Home';

const App:React.FC = () => {

  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
