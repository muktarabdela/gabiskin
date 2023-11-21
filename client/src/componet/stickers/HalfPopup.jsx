import React, { useState } from 'react';
import axios from '../../Axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/CartSlice';
import half_package from "../../../public/images/ourWork/14.png"
import regular_full_package from "../../../public/images/ourWork/7.png"
import premium_full_package from "../../../public/images/ourWork/premium_full.jpg"

function HalfPopup({ isOpen, onClose, onAddToCart, stickerId }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [price, setPrice] = useState(null);
    const [stickerData, setStickerData] = useState(null);
    const [sizeError, setSizeError] = useState(null);

    const dispatch = useDispatch();

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
        setSizeError(null);

        if (newSize === 'half_package') {
            setPrice(300);
        }
        else if (newSize === 'regular_full_package') {
            setPrice(500);
        } else if (newSize === 'premium') {
            setPrice(800);
        }
    }
    if (!isOpen) {
        return null;
    }
    const renderSizeDetails = () => {
        if (selectedSize === 'half_package') {
            return (
                <>
                    <p className='text-lg font-bold mb-2'>
                        Half Package Laptop Skin - Sticker only for the back of your screen
                    </p>
                    your laptop after installation 😍
                    <img className='w-[13em] mx-auto rounded' src={half_package} alt="Half Package Laptop Skin" />
                </>
            );
        } else if (selectedSize === 'regular_full_package') {
            return (
                <>
                    <p className='text-lg font-bold mb-2'>
                        Regular Full Package Laptop Skin - Front and back (For the back of your screen + on the keyboard area)
                    </p>

                    your laptop after installation 😍

                    <img className='w-[13em] mx-auto rounded' src={regular_full_package} alt="Half Package Laptop Skin" />
                </>
            );
        } else if (selectedSize === 'premium') {
            return (
                <>
                    <p className='text-lg font-bold mb-2'>
                        Premium Full Package Laptop Skin - Front, back, and bottom
                    </p>
                    <p className='my-2'>
                        Experience top-tier customization with this exclusive package. Elevate your laptop aesthetics with precision and attention to detail.
                    </p>
                    your laptop after installation 😍

                    <img className='mt-2 w-[13em] mx-auto rounded' src={premium_full_package} alt="Half Package Laptop Skin" />
                </>
            );
        }

        return null;
    };




    const updateSticker = async () => {
        if (!selectedSize) {
            setSizeError('Size is required');
            return;
        } else {
            setSizeError(null);
        }
        try {
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
                console.log(stickerData);
            }
            onAddToCart(selectedSize, price);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

            <div className="bg-white p-6 rounded-md shadow-lg sm:w-96 z-50">
                <h2 className="text-3xl font-semibold mb-4 text-black">Choose Your Sticker Size</h2>
                <div className="mb-4">
                    <div className="mb-2">
                        <select
                            name="SubCity"
                            className={`w-full px-4 py-3 rounded-md text-gray-700 font-medium border-solid border-2 focus:outline-none focus:border-blue-500 ${sizeError ? 'border-red-500' : 'border-gray-400'}`}
                            onChange={handleSizeChange}
                            value={selectedSize || ""}
                        >
                            <option value="" disabled>Select package</option>
                            <option value="half_package">Half package</option>
                            <option value="regular_full_package">Regular Full Package</option>
                            <option value="premium">Premium</option>
                        </select>
                        {sizeError && <p className="text-red-500 text-sm mt-1">{sizeError}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    {renderSizeDetails()}
                </div>
                <p className="text-gray-700 mb-2 text-lg mt-2">
                    Price: {price} ETB
                </p>
                <p className="text-lg text-blue-600">With Free Delivery</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Close
                    </button>
                    <button
                        onClick={updateSticker}
                        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded hover:bg-blue-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>


    );
}
export default HalfPopup;






