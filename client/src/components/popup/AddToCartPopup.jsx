import React, { useState } from 'react';
import axios from '../../Axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/CartSlice';

function AddToCartPopup({ isOpen, onClose, onAddToCart, stickerId }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [price, setPrice] = useState(null);
    const [stickerData, setStickerData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sizeError, setSizeError] = useState(null);

    const dispatch = useDispatch();
    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
        setSizeError(null);
        if (newSize === 'small') {
            setPrice(40);
        } else if (newSize === 'medium') {
            setPrice(50);
        } else if (newSize === 'large') {
            setPrice(60);
        }
    };

    if (!isOpen) {
        return null;
    }

    // const renderSizeDetails = () => {
    //     if (selectedSize === 'small') {
    //         return <p>Details for half_package</p>;
    //     } else if (selectedSize === 'medium') {
    //         return <p>Details for regular_full_package</p>;
    //     } else if (selectedSize === 'large') {
    //         return <p>Details for premium</p>;
    //     }

    //     return null;
    // };

    const updateSticker = async () => {
        if (!selectedSize) {
            setSizeError('Size is required');
            return;
        } else {
            setSizeError(null);
        }
        try {
            setIsLoading(true);

            const data = await axios.put(`/stickers/update/${stickerId}`, {
                size: selectedSize,
                price: price,
            });

            if (data.status === 200) {
                setStickerData(data.data.sticker);
                const stickerData = {
                    _id: data.data.sticker._id,
                    price: data.data.sticker.price,
                    size: selectedSize,
                    quantity: 1,
                    category: data.data.sticker.category,
                    imageUrl: data.data.sticker.imageUrl,
                };
                dispatch(addToCart(stickerData));
            }
            onAddToCart(selectedSize, price);
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

            <div className="bg-white p-6 rounded-md shadow-lg sm:w-96 z-50">
                <h2 className="text-2xl font-semibold mb-2 mt-[10px] text-black ">
                    Select Your chosen Sticker Size
                </h2>
                <div className="mb-3">
                    <div className="mb-2">
                        <select
                            name="SubCity"
                            className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 ${sizeError ? 'border-red-500' : 'border-gray-400'}`}

                            onChange={handleSizeChange}
                            value={selectedSize || ""}
                        >
                            <option value="" disabled>Select size and price</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                        {sizeError && <p className="text-red-500 text-sm mt-1">{sizeError}</p>}

                    </div>

                    {/* {renderSizeDetails()} */}
                </div>

                <p className="text-gray-700 mb-4 text-[18px]">Price: {price} ETB</p>
                <p className='text-[23px] text-blue-600'>With Free delivery</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-2 py-1 mr-[100px] mt-5 rounded hover:bg-blue-600 "
                        disabled={isLoading} // Disable the button when loading
                    >
                        Close
                    </button>
                    <button
                        onClick={updateSticker}
                        className="bg-blue-500 text-white px-2 py-1 mr-[15px] mt-5 rounded hover:bg-blue-600 "
                        disabled={isLoading} // Disable the button when loading
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>

                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4a7.963 7.963 0 01-6-2.709z"
                                    >
                                    </path>

                                </svg>
                            </>
                        ) : (
                            'Add to Cart'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddToCartPopup;
