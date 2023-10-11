import React from "react";
import iconComplete from '../icon-complete.svg';

export default function Complete () {
    const headerText = 'Thank you!';
    const paragraphText = 'We\'ve added your card details';

    return (
        <div className="complete">
            <img src={iconComplete} className="icon-complete" alt="Complete Icon" />
            <h2 className="header-text">{headerText}</h2>
            <p className="paragraph-text">{paragraphText}</p>
            <button type="button" className='confirm-button'>Continue</button>
        </div>
    )
}