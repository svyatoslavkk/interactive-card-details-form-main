import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import bgMainMobile from './bg-main-mobile.png';
import { CardForm } from './Components/CardForm';

function App() {

  return (
    <div className='container'>
      <img src={bgMainMobile} alt="Background Image" />
      <CardForm />
    </div>
  );
}

export default App;
