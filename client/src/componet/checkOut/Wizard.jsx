import React, { useState } from 'react';

const Wizard = ({ steps }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const handleFormDataChange = (data) => {
        setFormData({ ...formData, ...data });
    };

    const handleNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleMakePayment = () => {
        // Handle payment logic using formData
        console.log('Payment data:', formData);
    };

    const CurrentStepComponent = steps[activeStep].component;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <CurrentStepComponent
                formData={formData}
                onChange={handleFormDataChange}
                onNextStep={handleNextStep}
                onMakePayment={handleMakePayment}
            />
            <div className="mt-4">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        className={`mx-2 py-2 px-4 rounded-md ${index === activeStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                        onClick={() => handleStepChange(index)}
                        disabled={index > activeStep}
                    >
                        {step.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Wizard;
