import React, { useState } from 'react';

export const CardForm = () => {

    return (
        <div>
            <form className='form-block'>
                <div className='cardholder-name-row'>
                    <label>
                        <h4 className='input-title'>Cardholder Name</h4>
                        <input
                            type="text"
                            name="cardHolderName"
                            placeholder='e.g. Jane Appleseed'
                        />
                    </label>
                </div>
                <div className='card-number-row'>
                    <label>
                        <h4 className='input-title'>Card Number</h4>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder='e.g. 1234 5678 9123 0000'
                        />
                    </label>
                </div>
                <div className='mm-yy-cvv-row'>
                    <div className='expiry-month-year'>
                        <label>
                            <h4 className='input-title'>Exp. date (mm/yy)</h4>
                            <div style={{display: 'flex'}}>
                                    <input
                                        type="text"
                                        name="expiryMonth"
                                        className='mm-input'
                                        placeholder='MM'
                                    />
                                    <input
                                        type="text"
                                        name="expiryYear"
                                        className='yy-input'
                                        placeholder='YY'
                                    />
                            </div>
                        </label>
                    </div>
                    <div className='cvc'>
                        <label>
                            <h4 className='input-title'>CVC</h4>
                            <input
                                type="text"
                                name="cvv"
                                placeholder='e.g. 123'
                            />
                        </label>
                    </div>
                </div>
                <button type="submit" className='confirm-button'>Confirm</button>
            </form>
        </div>
    )
}
