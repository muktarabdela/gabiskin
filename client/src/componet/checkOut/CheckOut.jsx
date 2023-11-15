import React, { useContext, useState } from 'react';
import DeliveryForm from './DeliveryInfoForm';
import RegisterForm from './RegistrationForm';
import PaymentForm from './PaymentForm';
import { Stepper, StepLabel, Step } from '@material-ui/core';

import { MultiStepContext } from '../../Context/checkoutContext';



const CheckOut = () => {
    const { currentStep, finalData } = useContext(MultiStepContext)
    function showStep(step) {
        switch (step) {
            case 1:
                return <DeliveryForm />
            case 2:
                return <RegisterForm />
            case 3:
                return <PaymentForm />
        }
    }



    return (
        <div className='w-[24em] md:w-[30em] lg:w-[35em] h-[40em] rounded-lg mx-auto bg-white'>
            <h1 className="text-lg font-bold text-gray-700 leading-tight text-center mt-[90px] mb-">
                Form Wizard - Multi Step Form
            </h1>
            <Stepper style={{ width: '100%' }} activeStep={currentStep - 1} orientation='horizontal'>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
            </Stepper>
            {showStep(currentStep)}
        </div>

    );
};

export default CheckOut;

<div className='items-center h-screen w-[60vh] mt-[100px] bg-white'>


</div>