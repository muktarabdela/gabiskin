import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddToCartPopup from '../popup/AddToCartPopup';

function StickerCard({ sticker }) {
    const [selectedStickerId, setSelectedStickerId] = useState(sticker._id);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const openPopup = (stickerId) => {
        setSelectedStickerId(stickerId);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleAddToCart = () => {
        closePopup();
    };

    function CircularProgress() {
        return (
            <div className="flex items-center justify-center mt-4">
                <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
            </div>
        )
    }
    return (
        <div className="m-3">
            {isLoading && <CircularProgress />}
            <Card className='object-cover text-center mx-auto' elevation={3}
                onLoad={() => setIsLoading(false)}
            >
                <CardContent
                    className={`h-[20vh] md:h-[37vh] lg:h-[45vh]  bg-[#ebebf0]  ${isLoading ? 'hidden' : ''}`}>
                    <img
                        className="h-[12vh] lg:h-[16em] w-full lg:p-8  md:w-full object-fill text-center mx-auto "
                        // className='h-[12vh] w-[12vh] md:w-[25vh] md:h-[30vh] lg:h-[17em] lg:w-[15em] lg:p-[2em] p-2 object-cover text-center mx-auto '
                        src={sticker.imageUrl}
                        alt={sticker.name}
                    />
                    <button
                        onClick={() => openPopup(sticker._id)}
                        className="border-[none] rounded-[4px] bg-purple-800 text-[#fff] h-[25px] w-[80px] md:h-[25px] md:w-[80px] lg:h-[35px] lg:w-[90px] text-[15px] cursor-pointer [transition:0.5s]  opacity-70 ">
                        Order Now
                    </button>
                    <AddToCartPopup
                        isOpen={isPopupOpen}
                        onClose={closePopup}
                        onAddToCart={handleAddToCart}
                        stickerId={selectedStickerId}
                    />
                </CardContent>
            </Card>
        </div>
    );
}

export default StickerCard;
