import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import { selectRegistration, setName, setPassword } from '../../store/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDelivery } from '../../store/deliverySlice';
import { selectCartItems } from "../../store/CartSlice";
import axios from "../../Axios";
import { setUserId } from '../../store/userSlice';
const RegisterForm = () => {
    const { currentStep, DeliveryData, setDeliveryData, setStep, submitRegisterData, registerData, setRegisterData } = useContext(MultiStepContext)

    const deliveryData = useSelector(selectDelivery);
    const registrationData = useSelector(selectRegistration);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);
    const [phoneError, setPhoneError] = useState(null)
    const [errorData, setErrorData] = useState(null)

    const handleRegistration = async () => {
        try {
            const userData = {
                name: registrationData.name,
                email: registrationData.email,
                phone: deliveryData.phoneNumber,
                password: registrationData.password,
                confirmPassword: registrationData.confirmPassword,

                deliveryInfo: {
                    firstName: deliveryData.firstName,
                    lastName: deliveryData.lastName,
                    phone: deliveryData.phoneNumber,
                    subCity: deliveryData.subCity,
                    deliveryLocation: deliveryData.deliveryLocation,
                },
                orders: [
                    {
                        stickers: cartItems.map(item => ({
                            id: item.id,
                            price: item.price,
                            size: item.size,
                            quantity: item.quantity,
                            totalPrice: item.totalPrice,
                            category: item.category,
                            imageUrl: item.imageUrl,
                        })),
                    },
                ],
            }
            // make API 
            const response = await axios.post('/users/register', userData);
            console.log(response)
            const newUserId = response.data.newUser._id;
            dispatch(setUserId(newUserId));
            setEmailError(null);
            setPhoneError(null);

        } catch (error) {
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Error during registration:', error.response.data.error);

                // Handle email and phone number errors separately
                if (error.response.data.error.includes('email')) {
                    setEmailError('User with this email already exists');
                } else if (error.response.data.error.includes('phone')) {
                    setPhoneError('User with this phone number already exists');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }

        }
    }

    // Function to check if the email already exists
    const checkEmailExists = async (email) => {
        try {
            const response = await axios.post('/users/check-email', { email });
            return response.data.exists; // Assuming the server responds with an object containing a boolean property 'exists'
        } catch (error) {
            console.error('Error checking email existence:', error);
            return true; // Treat any error as email exists to prevent moving forward
        }
    };

    // Function to check if the phone number already exists
    const checkPhoneExists = async (phoneNumber) => {
        try {
            const response = await axios.post('/users/check-phone', { phoneNumber });
            return response.data.exists; // Assuming the server responds with an object containing a boolean property 'exists'
        } catch (error) {
            console.error('Error checking phone number existence:', error);
            return true; // Treat any error as phone number exists to prevent moving forward
        }
    };

    const validateInput = () => {
        let isValid = true;

        // Validate name
        if (!DeliveryData["firstName"]) {
            setNameError("First name is required");
            isValid = false;
        } else {
            setNameError(null);
        }

        // Validate email
        if (!registerData["Email"]) {
            setEmailError("Email is required");
            isValid = false;
        } else {
            const emailExists =  checkEmailExists(registerData["Email"]);
            if (emailExists) {
                setEmailError("User with this email already exists");
                isValid = false;
            } else {
                setEmailError(null);
            }
        }

        // Validate phone number
        // Validate phone number
        if (!deliveryData.phoneNumber) {
            setPhoneError("Phone number is required");
            isValid = false;
        } else {
            const phoneExists =  checkPhoneExists(deliveryData.phoneNumber);
            if (phoneExists) {
                setPhoneError("User with this phone number already exists");
                isValid = false;
            } else {
                setPhoneError(null);
            }
        }

        // Validate password
        if (!registerData["password"]) {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError(null);
        }

        // Validate confirmPassword and check if it matches password
        if (!registerData["confirmPassword"]) {
            setPasswordConfirmError("Confirm Password is required");
            isValid = false;
        } else if (registerData["password"] !== registerData["confirmPassword"]) {
            setPasswordConfirmError("Password and Confirm Password do not match");
            isValid = false;
        } else {
            setPasswordConfirmError(null);
        }

        return isValid;
    };


    useEffect(() => {
        if (currentStep === 2) {
            submitRegisterData();
            registrationData
        }
    }, [currentStep, submitRegisterData, handleRegistration]);


    return (
        <div className="w-[40vh] mx-auto  bg-white">

            <>
                <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                    {" "}
                    you need account to mange your order
                </p>
                <p className="text-red-600">{phoneError}</p>
                <div className={`mb-2 ${emailError ? 'error' : ''}`}>
                    <TextField
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400 ${nameError ? 'border-red-500 bg-red-100' : '' // Apply red border and background on error
                            }`}
                        onInput={() => setNameError(null)}
                        value={DeliveryData["firstName"]}
                        onChange={(e) => setDeliveryData({ ...DeliveryData, "firstName": e.target.value })}
                    />

                </div>

                <div className="mb-2">
                    <p className="text-red-600"> {emailError}</p>
                    <TextField
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400 ${emailError ? 'border-red-500 bg-red-100' : ''
                            }`}
                        onInput={() => setEmailError(null)}
                        value={registerData["Email"]}
                        onChange={(e) => setRegisterData({ ...registerData, "Email": e.target.value })}
                    />

                </div>
                <div className={`mb-2 ${passwordError ? 'error' : ''}`}>
                    <TextField
                        type="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400 ${passwordError ? 'border-red-500 bg-red-100' : ''
                            }`}
                        onInput={() => setPasswordError(null)}
                        value={registerData["password"]}
                        onChange={(e) => setRegisterData({ ...registerData, "password": e.target.value })}
                    />

                </div>
                <div className={`mb-2 ${passwordConfirmError ? 'error' : ''}`}>
                    <p className="text-red-400">{passwordConfirmError}</p>
                    <TextField
                        type="password"
                        label="Confirm password"
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400 ${passwordConfirmError ? 'border-red-500 bg-red-100' : ''
                            }`}
                        onInput={() => setPasswordConfirmError(null)}
                        value={registerData["confirmPassword"]}
                        onChange={(e) => setRegisterData({ ...registerData, "confirmPassword": e.target.value })}
                    />
                </div>

                <div className="flex mt-7">
                    <div className=" mx-auto" >
                        <Button onClick={() => setStep(1)} variant="contained" color="primary"> Back</Button>
                    </div>
                    <div className="mx-auto">
                        <Button
                            className=""
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                if (validateInput()) {
                                    setRegisterData({ ...registerData, "Email": registerData["Email"] });
                                    setStep(3);
                                    submitRegisterData();
                                    handleRegistration();
                                }
                            }}
                        >
                            Register
                        </Button>



                    </div>
                </div>
            </>
        </div >
    );
};

export default RegisterForm;
