import { Button, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import { selectRegistration, } from '../../store/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectDelivery } from '../../store/deliverySlice';
import { selectCartItems } from "../../store/CartSlice";
import axios from "../../Axios";
import { setUserId, setEmailErrorData, setPhoneErrorData } from '../../store/userSlice';
    import { jwtDecode } from 'jwt-decode';

const RegisterForm = () => {

    const token = localStorage.getItem('acc2essToken');
    const isValidToken = typeof token === 'string' && token.length > 0;
    const decodedToken = isValidToken ? jwtDecode(token) : null;
    const userIdFromToken = decodedToken ? decodedToken.userId : null;
    console.log(userIdFromToken)
    const { currentStep, DeliveryData, setDeliveryData, setStep, submitRegisterData, registerData, setRegisterData } = useContext(MultiStepContext)

    const deliveryData = useSelector(selectDelivery);
    const registrationData = useSelector(selectRegistration);
    const cartItems = useSelector(selectCartItems);
    // Use Redux state for error data
    const emailError = useSelector(state => state.user.emailError);
    console.log(emailError)
    const dispatch = useDispatch();
    const [nameError, setNameError] = useState(null);
    const [emailErrorInput, setEmailErrorInput] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);

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
            const token = response.data.token;
            console.log("console fro token", token)

            localStorage.setItem('acc2essToken', token);
            const newUserId = response.data.newUser._id;
            dispatch(setUserId(newUserId));

            console.log('Response from server:', response.data)

        } catch (error) {
            console.log(error.response.data.error)
            dispatch(setEmailErrorData(error.response.data.error));
            dispatch(setPhoneErrorData(error.response.data.error));
        }

    }

    const validateInput = () => {
        let isValid = true;

        // Validate  name
        if (!DeliveryData["firstName"]) {
            setNameError("First name is required");
            isValid = false;
        } else {
            setNameError(null);
        }

        // Validate email
        if (!registerData["Email"]) {
            setEmailErrorInput("email required");
            isValid = false;
        } else if (emailError === "User with this email already exists") {
            setEmailErrorInput("this email already exists")
            isValid = false;

        }
        else if (emailError === "User with this email already exists") {
            setEmailErrorInput("this email already exists")
            isValid = false;

        }
        else {
            setEmailErrorInput(null);
        }

        // Validate password
        if (!registerData["password"]) {
            setPasswordError("Phone number is required");
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
                <p className="text-red-500">{emailErrorInput}</p>

                <div className={`mb-2 ${nameError ? 'error' : ''}`}>
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
                <div className={`mb-2 ${emailErrorInput ? 'error' : ''}`}>
                    <TextField
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400 ${emailErrorInput ? 'border-red-500 bg-red-100' : ''
                            }`}
                        onInput={() => setEmailErrorInput(null)}
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
