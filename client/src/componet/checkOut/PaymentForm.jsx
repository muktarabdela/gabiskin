import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import axios from "../../Axios";
import telebir from "../../../public/images/telebirr.png"
import cbe from "../../../public/images/cbe.jpeg"
import boa from "../../../public/images/boa.png"
import { useSelector } from 'react-redux';
import { selectUserId } from '../../store/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { selectDelivery } from '../../store/deliverySlice';
import { selectCartItems } from "../../store/CartSlice";

const PaymentForm = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('acc2essToken');
    const isValidToken = typeof token === 'string' && token.length > 0;
    const decodedToken = isValidToken ? jwtDecode(token) : null;
    const userIdFromToken = decodedToken ? decodedToken.userId : null;

    const deliveryData = useSelector(selectDelivery);
    const cartItems = useSelector(selectCartItems);
    console.log(deliveryData)
    useEffect(() => {
        const checkUserRegistration = async () => {
            if (userIdFromToken) {
                try {
                    const updatedUserData = {
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
                    };



                    const updatedUserDataResponse = await axios.put(`/users/${userIdFromToken}`, updatedUserData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log('User data updated:', updatedUserDataResponse.data);
                } catch (error) {
                    // Handle errors
                    console.error('Error updating user data:', error);
                }
            }
        };

        checkUserRegistration();
    }, [userIdFromToken, token, deliveryData, cartItems]);

    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { setStep, } = useContext(MultiStepContext)
    const [images, setImages] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null)
    const userId = useSelector(selectUserId);
    const userIdToUse = userIdFromToken || userId;

    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value;
        setPaymentMethod(selectedPaymentMethod);
    };
    console.log(userId)

    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages(files);
    };
    const handleUpload = async () => {
        if (!images || images.length === 0) {
            console.error('No images selected for upload.');
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', images[0]);
        formData.append('upload_preset', 'Receipt_screenshot');
        formData.append('folder', 'Receipt');

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dcug2edrg/image/upload",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log('Image uploaded:', response.data.secure_url);
            const token = localStorage.getItem('acc2essToken');

            const paymentInfo = await axios.post('/users/paymentInfo', {
                userId: userIdToUse,
                receiptScreenshot: response.data.secure_url,
                paymentMethod: paymentMethod,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            navigate(`/account/${userId}`, { replace: true });
            window.location.reload();
            console.log(paymentInfo);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
    };
    return (
        <div className=" flex flex-col items-center justify-center bg-gray-100">
            <p className="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
                We will never sell your information.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4 text-blue-500">Payment Options</h2>

                {/* Payment Buttons */}
                <div className="mb-4 flex justify-between">
                    <Tooltip title="Pay with Telebirr" arrow>
                        <img
                            onClick={() => handlePaymentSelect("telebirr")}
                            className="cursor-pointer  w-[7em] rounded-md h-[4em]" src={telebir} alt="" />
                    </Tooltip>
                    <Tooltip title="Pay with CBE" arrow>
                        <img
                            onClick={() => handlePaymentSelect("cbe")}
                            className="cursor-pointer  w-[4em] rounded-md h-[4em]"
                            src={cbe} alt="" />
                    </Tooltip>
                    <Tooltip title="Pay with BOA" arrow>
                        <img
                            onClick={() => handlePaymentSelect("boa")}
                            className="cursor-pointer w-[4em] rounded-md h-[4em]"
                            src={boa} alt="" />
                    </Tooltip>
                </div>

                {/* Payment Details */}
                {selectedPayment && (
                    <div className="mb-4">
                        <p className="text-md font-semibold mb-2 text-black">
                            After making the payment, please do the following:
                        </p>
                        <ul className="list-disc list-inside text-black">
                            <li>
                                Take a screenshot of your payment receipt.
                            </li>
                            <li>
                                Send the screenshot to our Telegram account.
                            </li>
                        </ul>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => window.open('https://t.me/kalidkalaw1', '_blank')}
                        >
                            Open Telegram
                        </Button>
                        {selectedPayment === "telebirr" && (
                            <div className="mx-6 my-2">
                                <p className="text-xl text-black">Mobile Number: <span className="text-blue-500"> 0932874527</span></p>
                            </div>
                        )}
                        {selectedPayment === "cbe" && (
                            <div className="mx- my-2">
                                <p className="text-xl text-black">Account Number : <span className="text-gray-600 text-xl"> 1000341105408 </span></p>
                                <p className="text-lg text-black">Account Name: <span className="text-xl">kalid hashim</span></p>
                            </div>
                        )}
                        {selectedPayment === "boa" && (
                            <div className=" my-2">
                                <p className="text-xl text-black">Account Number : <span className="text-gray-600 text-xl"> 1000341105408 </span></p>
                                <p className="text-lg text-black">Account Name: <span className="text-xl">kalid hashim</span></p>
                            </div>
                        )}
                    </div>
                )}
                <div className="mb-2">
                    <select
                        name="SubCity"
                        className="w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 border-gray-400"
                        onChange={handlePaymentMethodChange}
                        value={paymentMethod || ''}
                    >
                        <option value="" disabled>Select payment method</option>
                        <option value="Telebirr">Tele birr</option>
                        <option value="CBE">CBE</option>
                        <option value="BOA">BOA</option>
                    </select>

                </div>
                <div>
                    <div>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="multiple_files"
                        >
                            Receipt screenshot
                        </label>
                        <input
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="multiple_files"
                            type="file"
                            multiple
                        />
                    </div>


                </div>

                <div className="flex mt-[2em]">
                    <div className="mx-auto">
                        <Button
                            onClick={() => setStep(2)}
                            variant="contained"
                            color="default"
                        >
                            Back
                        </Button>
                    </div>

                    <div className="mx-auto">
                        <Button
                            className=""
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setIsLoading(true); // Set loading state to true when the Pay button is clicked
                                handleUpload();
                                setStep(3);
                            }}
                            disabled={isLoading} // Disable the button when loading
                        >
                            {isLoading ? (
                                <>
                                    <CircularProgress size={20} color="inherit" />
                                    <span className="ml-3">Processing...</span>
                                </>
                            ) : (
                                'Pay'
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
