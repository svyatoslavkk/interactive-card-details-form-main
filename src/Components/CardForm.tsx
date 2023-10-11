import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

interface FormErrors {
    cardHolderName: string;
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
}

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

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        let newErrors = { ...errors };

        if (name === 'cardHolderName') {
            if (!value) {
                newErrors = { ...newErrors, cardHolderName: 'Enter cardholder name' };
            } else {
                newErrors = { ...newErrors, cardHolderName: '' };
            }
        }
    
        if (name === 'cardNumber') {
            if (!/^\d{16}$/.test(value)) {
                newErrors = { ...newErrors, cardNumber: 'Wrong card number' };
            } else {
                newErrors = { ...newErrors, cardNumber: '' };
            }
        }
    
        if (name === 'expiryMonth') {
            if (!/^\d{2}$/.test(value) || +value < 1 || +value > 12) {
                newErrors = { ...newErrors, expiryMonth: 'Wrong month' };
            } else {
                newErrors = { ...newErrors, expiryMonth: '' };
            }
        }
    
        if (name === 'expiryYear') {
            if (!/^\d{2}$/.test(value) || +value < 21) {
                newErrors = { ...newErrors, expiryYear: 'Wrong year' };
            } else {
                newErrors = { ...newErrors, expiryYear: '' };
            }
    
            if (/^\d{2}$/.test(value) && +value >= 21) {
                newErrors = { ...newErrors, expiryYear: '' };
            }
        }

        if (name === 'cvv') {
            if (!/^\d{3}$/.test(value)) {
                newErrors = { ...newErrors, cvv: 'Wrong CVC' };
            } else {
                newErrors = { ...newErrors, cvv: '' };
            }
            setErrors(newErrors);
        }
        
        setErrors({ ...errors, [name]: '' });
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
        let hasErrors = false;

        for (const [name, value] of Object.entries(formData)) {
            if (!value) {
                hasErrors = true;
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: "Can't be blank",
                }));
            }
        }
    
        if (hasErrors) {
            setIsSubmitting(false);
            return;
        }
    
        console.log('Data has been sent:', formData);
        setIsSubmitting(true);
        
        console.log('About to navigate to /complete');
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
                        {errors.cardHolderName && (
                            <p className='error-message'>{errors.cardHolderName}</p>
                        )}
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
                        {errors.cardNumber && (
                            <p className='error-message'>{errors.cardNumber}</p>
                        )}
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
                            {(errors.expiryMonth || errors.expiryYear) && (
                                <p className='error-message'>{errors.expiryMonth || errors.expiryYear}</p>
                            )}
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
                            {errors.cvv && (
                                <p className='error-message'>{errors.cvv}</p>
                            )}
                        </label>
                    </div>
                </div>
                <Link to="/complete" style={{textDecoration: "none"}}>
                    <button className='confirm-button' onClick={handleSubmit}>Confirm</button>
                </Link>
                  <div id="detail">
                      <Outlet />
                  </div>
            </form>
        </div>
    )
}
