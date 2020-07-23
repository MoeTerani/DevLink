import React from 'react';
import './App.css';
import NavBar from '../src/components/layout/NavBar';
import Landing from '../src/components/layout/Landing';

const App = () => {
  return (
    <div className='App'>
      <NavBar />
      <Landing />
    </div>
  );
};

export default App;
