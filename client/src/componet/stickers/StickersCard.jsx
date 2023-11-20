import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AddToCartPopup from '../popup/AddToCartPopup';

function StickerCard({ sticker, currentPage, stickersPerPage, onPageChange }) {
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
            <Card className='object-cover text-center mx-auto' elevation={3}>
                <CardContent className='h-[20vh] md:h-[37vh] lg:h-[39vh] bg-[#ebebf0]'>
                    {isLoading && <CircularProgress />}
                    <img
                        src={sticker.imageUrl}
                        alt={sticker.name}
                        className={`h-[12vh] w-[10vh] md:w-[25vh] md:h-[30vh] object-cover text-center mx-auto ${isLoading ? 'hidden' : ''}`}
                        onLoad={() => setIsLoading(false)}
                    />
                    <button
                        onClick={() => openPopup(sticker._id)}
                        className="border-[none] rounded-[4px] bg-purple-800 text-[#fff] h-[25px] w-[80px] md:h-[25px] md:w-[80px] lg:h-[35px] lg:w-[90px] text-[15px] cursor-pointer [transition:0.5s]  opacity-70 mt-[8px]">
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
