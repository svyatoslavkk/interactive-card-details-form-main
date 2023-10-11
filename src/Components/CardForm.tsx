import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

export const CardForm = () => {
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'cardHolderName') {
            if (!value) {
                setErrors({ ...errors, cardHolderName: 'Enter cardholder name' });
            } else {
                setErrors({ ...errors, cardHolderName: '' });
            }
        }

        if (name === 'cardNumber') {
            if (!/^\d{16}$/.test(value)) {
                setErrors({ ...errors, cardNumber: 'Wrong card number' });
            } else {
                setErrors({ ...errors, cardNumber: '' });
            }
        }

        if (name === 'expiryMonth') {
            if (!/^\d{2}$/.test(value) || +value < 1 || +value > 12) {
                setErrors({ ...errors, expiryMonth: 'Wrong month' });
            } else {
                setErrors({ ...errors, expiryMonth: '' });
            }
        }

        if (name === 'expiryYear') {
            if (!/^\d{2}$/.test(value) || +value < 21) {
                setErrors({ ...errors, expiryYear: 'Wrong year' });
            } else {
                setErrors({ ...errors, expiryYear: '' });
            }
        }

        if (name === 'cvv') {
            if (!/^\d{3}$/.test(value)) {
                setErrors({ ...errors, cvv: 'Wrong CVC' });
            } else {
                setErrors({ ...errors, cvv: '' });
            }
        }
    };

    const handleNumericInput = (e: any) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, '');

        if (name === 'cardNumber' && numericValue.length === 16) {
            const expiryMonthInput = document.querySelector('input[name="expiryMonth"]') as HTMLInputElement | null;
            if (expiryMonthInput) {
                expiryMonthInput.focus();
            }
        }

        if (name === 'expiryMonth' && numericValue.length === 2) {
            const expiryYearInput = document.querySelector('input[name="expiryYear"]') as HTMLInputElement | null;
            if (expiryYearInput) {
                expiryYearInput.focus();
            }
        }

        if (name === 'expiryYear' && numericValue.length === 2) {
            const cvv = document.querySelector('input[name="cvv"]') as HTMLInputElement | null;
            if (cvv) {
                cvv.focus();
            }
        }
    
        if (name === 'cardNumber') {
            const formattedValue = numericValue
                .replace(/(\d{4})/g, '$1 ')
                .trim()
                .substring(0, 19);
            setFormData({
                ...formData,
                [name]: formattedValue,
            });
        } else if (name === 'expiryMonth') {
            const formattedValue = numericValue.substring(0, 2);
            setFormData({
                ...formData,
                [name]: formattedValue,
            });
        } else if (name === 'expiryYear') {
            const formattedValue = numericValue.substring(0, 2);
            setFormData({
                ...formData,
                [name]: formattedValue,
            });
        } else if (name === 'cvv') {
            const formattedValue = numericValue.substring(0, 3);
            setFormData({
                ...formData,
                [name]: formattedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: numericValue,
            });
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (Object.values(errors).every((error) => !error)) {
            console.log('Data has been sent:', formData);
        } else {
            console.log('The form has errors. Please correct it.');
        }
    };

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
                            onChange={handleChange}
                            value={formData.cardHolderName}
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
                            onChange={handleNumericInput}
                            value={formData.cardNumber}
                            inputMode="numeric"
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
                                        onChange={handleNumericInput}
                                        value={formData.expiryMonth}
                                        inputMode="numeric"
                                    />
                                    <input
                                        type="text"
                                        name="expiryYear"
                                        className='yy-input'
                                        placeholder='YY'
                                        onChange={handleNumericInput}
                                        value={formData.expiryYear}
                                        inputMode="numeric"
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
                                onChange={handleNumericInput}
                                value={formData.cvv}
                                inputMode="numeric"
                            />
                        </label>
                    </div>
                </div>
                <Link to="/complete" style={{textDecoration: "none"}}>
                    <button type="submit" className='confirm-button'>Confirm</button>
                </Link>
                  <div id="detail">
                      <Outlet />
                  </div>
            </form>
        </div>
    )
}
