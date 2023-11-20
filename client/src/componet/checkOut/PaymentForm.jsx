import { Button, CircularProgress, Tooltip } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { MultiStepContext } from "../../Context/checkoutContext";
import axios from "../../Axios";
import telebir from "../../../public/images/telebirr.png"
import cbe from "../../../public/images/cbe.jpeg"
import boa from "../../../public/images/boa.png"
import { useSelector } from 'react-redux';
import { selectUserId, setErrorData } from '../../store/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { selectDelivery } from '../../store/deliverySlice';
import { selectCartItems } from "../../store/CartSlice";
import { useDispatch } from 'react-redux';

const PaymentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem('acc2essToken');
    const isValidToken = typeof token === 'string' && token.length > 0;
    const decodedToken = isValidToken ? jwtDecode(token) : null;
    const userIdFromToken = decodedToken ? decodedToken.userId : null;

    const deliveryData = useSelector(selectDelivery);
    const cartItems = useSelector(selectCartItems);
    const error = useSelector(state => state.user.Error);

    const [paymentMethodError, setPaymentMethodError] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(true);

    const [selectedPayment, setSelectedPayment] = useState(null);
    const { setStep, } = useContext(MultiStepContext)
    const [images, setImages] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null)
    const userId = useSelector(selectUserId);

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

                    const updatedUserDataResponse = await axios.patch(`/users/${userIdFromToken}`,
                        updatedUserData, {
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

    const userIdToUse = userIdFromToken || userId;

    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value;
        setPaymentMethod(selectedPaymentMethod);
        setPaymentMethodError(null);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages(files);
        setImageError(null);
    };
    const handleUpload = async () => {
        if (!paymentMethod) {
            setPaymentMethodError('Payment method is required');
            return;
        } else {
            setPaymentMethodError(null);
        }

        if (!images || images.length === 0) {
            setImageError('Image file is required');
            return;
        } else {
            setImageError(null);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
    };
    return (
        <div className=" flex flex-col items-center justify-center bg-gray-100">
            {isSubmitting && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, padding: 10, background: '#fff', textAlign: 'center' }}>
                    <CircularProgress size={20} color="inherit" />
                    <span className="ml-3">It takes a minute. Please wait until the end...</span>
                </div>
            )}

            <p className="text-lg text-gray-700 leading-tight text-center mt-8 mb-5">
                Easy payment method
            </p>
            <p className="text-red-500 my-2">{error}</p>

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


                        {selectedPayment === "telebirr" && (
                            <>
                                <div className="mx-6 my-2">
                                    <p className="text-xl text-center font-semibold mb-2 text-black">
                                        Kalid Shamil
                                    </p>
                                    <p className="text-xl text-black">Mobile Number: <span className="text-blue-500"> 0982761602</span></p>
                                </div>

                                <p className="text-md font-semibold mb-2 text-black">
                                    ክፍያውን ከፈጸሙ በኋላ የሚከተሉትን ያድርጉ
                                </p>
                                <ul className="list-disc list-inside text-black">
                                    <li>
                                        የክፍያ ደረሰኝዎን screenshot ያንሱ።
                                    </li>
                                    <li className="my-3">
                                        ስክሪንሾቱን ከታች ባለው ፎርም  ይላኩ
                                    </li>
                                </ul>
                            </>

                        )}
                        {selectedPayment === "cbe" && (
                            <>
                                <div className="mx-6 my-2">
                                    <p className="text-xl text-center font-semibold mb-2 text-blue-500">
                                        <span className="text-gray-700"> Name : </span>  Kalid Shamil
                                    </p>
                                    <p className="text-lg text-black">Account Number <span className="text-blue-500"> 1000254618571</span></p>
                                </div>

                                <p className="text-md font-semibold mb-2 text-black">
                                    ክፍያውን ከፈጸሙ በኋላ የሚከተሉትን ያድርጉ
                                </p>
                                <ul className="list-disc list-inside text-black">
                                    <li>
                                        የክፍያ ደረሰኝዎን screenshot ያንሱ።
                                    </li>
                                    <li className="my-3">
                                        ስክሪንሾቱን ከታች ባለው ፎርም  ይላኩ
                                    </li>
                                </ul>
                            </>

                        )}
                        {selectedPayment === "boa" && (
                            <>
                                <div className="mx-6 my-2">
                                    <p className="text-xl text-center font-semibold mb-2 text-blue-500">
                                        <span className="text-gray-700"> Name : </span>  Kalid Shamil
                                    </p>
                                    <p className="text-lg text-black">Account Number <span className="text-blue-500"> 115144782</span></p>
                                </div>

                                <p className="text-md font-semibold mb-2 text-black">
                                    ክፍያውን ከፈጸሙ በኋላ የሚከተሉትን ያድርጉ
                                </p>
                                <ul className="list-disc list-inside text-black">
                                    <li>
                                        የክፍያ ደረሰኝዎን screenshot ያንሱ።
                                    </li>
                                    <li className="my-3">
                                        ስክሪንሾቱን ከታች ባለው ፎርም  ይላኩ
                                    </li>
                                </ul>
                            </>

                        )}
                    </div>
                )}
                <div className="mb-2">
                    <select
                        name="SubCity"
                        className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 ${paymentMethodError ? 'border-red-500' : 'border-gray-400'}`}

                        onChange={handlePaymentMethodChange}
                        value={paymentMethod || ''}
                    >
                        <option value="" disabled>Select payment method</option>
                        <option value="Telebirr">Tele birr</option>
                        <option value="CBE">CBE</option>
                        <option value="BOA">BOA</option>
                    </select>
                    {paymentMethodError && <p className="text-red-500 text-sm mt-1">{paymentMethodError}</p>}

                </div>
                <div>
                    <div>
                        <label
                            className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${imageError ? 'text-red-500' : ''}`}

                        >
                            Receipt screenshot
                        </label>
                        <input
                            onChange={handleImageChange}
                            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${imageError ? 'border-red-500' : ''}`}

                            id="multiple_files"
                            type="file"
                            multiple
                        />
                    </div>
                    {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}


                </div>

                <div className="flex mt-[2em]">
                    <div className="mx-auto">
                        <Button
                            onClick={() => {
                                dispatch(setErrorData(null));
                                setStep(2);
                            }}
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
                                if (paymentMethodError || imageError) {
                                    console.error('Please provide valid payment method and image');
                                } else {
                                    setIsLoading(true);
                                    handleUpload();
                                    setStep(3);
                                }
                            }}
                            disabled={isLoading || paymentMethodError || imageError}
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
