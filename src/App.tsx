import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import bgMainMobile from './bg-main-mobile.png';
import bgCartFront from './bg-card-front.png';
import bgCartBack from './bg-card-back.png';
import cardLogo from './card-logo.svg';
import { CardForm } from './Components/CardForm';

function App() {

  return (
    <div className='container'>
      <img src={bgMainMobile} className='bg-main-mobile' alt="Background Image" />
      <div className='bg-cart-back'>
        <div className='relative-block'>
          <img src={bgCartBack} alt='Card Back' />
          <p className='cvc-on-img'>000</p>
        </div>
      </div>
      <div className='bg-cart-front'>
        <div className='relative-block'>
          <img src={bgCartFront} alt="Card Front" />
          <img src={cardLogo} className='card-logo' alt="Card Logo" />
          <p className='number-on-img'>0000 0000 0000 0000</p>
          <p className='cardholder-on-img'>Jane Appleseed</p>
          <p className='date-on-img'>00/00</p>
        </div>
      </div>
      <CardForm />
    </div>
  );
}

export default App;
