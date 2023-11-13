import React, { useState } from 'react';
import axios from '../../Axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/CartSlice';
import { Radio } from '@material-tailwind/react';
function AddToCartPopup({ isOpen, onClose, onAddToCart, stickerId }) {
    const [selectedSize, setSelectedSize] = useState('small');
    const [price, setPrice] = useState(35);
    const [stickerData, setStickerData] = useState(null);
    const dispatch = useDispatch();

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
        if (newSize === 'big') {
            setPrice(50);
        } else if (newSize === 'medium') {
            setPrice(45);
        } else {
            setPrice(35);
        }
    }
    if (!isOpen) {
        return null;
    }

    const updateSticker = async () => {
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
        <div className="fixed inset-2 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded shadow-md mb-[240px] md:mb-[130px] lg:mb-[100px] w-[40vh] sm:h-[50vh] md:h-[70vh]">
                <h2 className="text-2xl font-semibold mb-2 mt-[10px]
                text-black ">Select Your choose Sticker Size</h2>
                <div onClick={onClose}
                    className='cursor-pointer absolute sm:top-[45px] sm:right-[2px] md:right-[20px] md:top-[100px] lg:left-[920px] lg:top-[130px] xl:right-[400px] xl:top-[150]'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" h-[35px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                </div>
                <div className="mb-3">
                    <div className='mt-[60px]'>
                        <div className=''>
                            <Radio
                                id="sizeSmall"
                                value="small"
                                checked={selectedSize === 'small'}
                                onChange={handleSizeChange}
                                name="size" label="Small"
                            />
                        </div>
                        <div>
                            <Radio
                                value="medium"
                                checked={selectedSize === 'medium'}
                                onChange={handleSizeChange}
                                name="size" label="medium" />
                        </div>
                        <div>
                            <Radio
                                id="sizeBig"
                                value="big"
                                checked={selectedSize === 'big'}
                                onChange={handleSizeChange}
                                name="size" label="Small" />
                        </div>
                    </div>


                </div>
                <p className="text-gray-700 mb-4 text-[18px]">
                    Price: {price} ETB
                </p>
                <div className="flex justify-end">
                    <button
                        onClick={updateSticker}
                        className="bg-blue-500 text-white px-2 py-1 mr-[15px] mt-5 rounded hover:bg-blue-600 "
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

        </div>
    );
}
export default AddToCartPopup;






