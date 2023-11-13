import { Button, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import axios from "../../Axios";
const PaymentForm = () => {
    const { setStep, } = useContext(MultiStepContext)
    const [paymentUrl, setPaymentUrl] = useState('');

    const initializePayment = async () => {
        try {
            // Make a POST request to your backend route that initializes Chapa payment
            const response = await axios.post('/payment', {
                amount: 1000, // Replace with the actual amount
            });

            const checkoutUrl = response.data;

            // Redirect the user to the Chapa payment page
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Error initializing payment:', error);
        }
    };
    return (
        <div className="w-[40vh] h-[70vh] mx-auto">
            <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                We will never sell it
            </p>
            <div className="mb-2">
                <TextField
                    label="amount"
                    margin="normal"
                    variant="outlined"
                    className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                    oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                // value={DeliveryData["lastName"]}
                // onChange={(e) => setDeliveryData({ ...DeliveryData, "lastName": e.target.value })}
                />
            </div>

            <div className="flex mt-7">
                <div className=" mx-auto" >
                    <Button onClick={() => setStep(2)} variant="contained" color="primary"> Back</Button>
                </div>
                <div className="mx-auto">
                    <Button className="" variant="contained" color="primary" onClick={() => {
                        initializePayment();
                        setStep(2);
                    }}> Pay</Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
