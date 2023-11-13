import { Button, TextField } from "@material-ui/core";
import { useContext, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import { selectRegistration } from '../../store/registrationSlice';
import { useSelector } from 'react-redux';
import { selectDelivery } from '../../store/deliverySlice';
import { selectCartItems } from "../../store/CartSlice";
import axios from "../../Axios";
import { useNavigate } from 'react-router-dom';
import Admin from "../../pages/Admin";
const RegisterForm = () => {
    const { DeliveryData, setDeliveryData, setStep, submitRegisterData, registerData, setRegisterData } = useContext(MultiStepContext)

    const deliveryData = useSelector(selectDelivery);
    const registrationData = useSelector(selectRegistration);
    const cartItems = useSelector(selectCartItems);
    const [userId, setUserId] = useState(null)
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const userData = {
                name: registrationData.name,
                email: registrationData.email,
                phone: deliveryData.phoneNumber,
                password: registrationData.password,
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
            console.log("Delivery log from deliverySlice", selectDelivery)
            console.log("registrationData from regstration slice", registrationData)
            // make API 
            const response = await axios.post('/users/register', userData);
            const userId = response.data.newUser._id;
            navigate(`/account/${userId}`, { replace: true });
            window.location.reload();
            setUserId(userId);

            console.log('Response from server:', response.data)
        } catch (error) {
            console.error('Error during registration:', error);

        }
    }


    return (
        <div className="w-[40vh] mx-auto  bg-white">
            {!userId ? (
                <>
                    <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                        {" "}
                        you need account to mange your order
                    </p>
                    <div className="mb-2">
                        <TextField
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            color="secondary"
                            className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                            oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                            value={DeliveryData["firstName"]}
                            onChange={(e) => setDeliveryData({ ...DeliveryData, "firstName": e.target.value })}
                        />

                    </div>
                    <div className="mb-2">
                        <TextField
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                            oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                            value={registerData["Email"]}
                            onChange={(e) => setRegisterData({ ...registerData, "Email": e.target.value })}

                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            color="secondary"
                            className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                            oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                            value={registerData["password"]}
                            onChange={(e) => setRegisterData({ ...registerData, "password": e.target.value })}
                        />

                    </div>
                    <div className="mb-2">
                        <TextField
                            type="password"
                            label="Confirm password"
                            margin="normal"
                            variant="outlined"
                            color="secondary"
                            className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                            oninput="this.className = 'w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-200'"
                        />
                    </div>
                    <div className="flex mt-7">
                        <div className=" mx-auto" >
                            <Button onClick={() => setStep(1)} variant="contained" color="primary"> Back</Button>
                        </div>
                        <div className="mx-auto">
                            <Button className="" variant="contained" color="primary" onClick={() => {
                                submitRegisterData();
                                handleRegistration();
                                setStep(3);
                            }}> Register</Button>
                        </div>
                    </div>
                </>
            ) : (
                <Admin userId={userId} />
            )}
        </div >
    );
};

export default RegisterForm;
