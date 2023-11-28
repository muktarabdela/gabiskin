import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HalfPopup from './HalfPopup';

function HalfCard({ sticker }) {
    const [selectedStickerId, setSelectedStickerId] = useState(sticker._id);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const openPopup = (stickerId) => {
        setSelectedStickerId(stickerId);
        setIsPopupOpen(true);
    }
    const closePopup = () => {
        setIsPopupOpen(false);
    }
    const handleAddToCart = () => {
        closePopup();
    }

    function CircularProgress() {
        return (
            <div className="flex items-center justify-center mt-4">
                <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin">
                </div>
            </div>
        )
    }
    return (
        <div className=" m-1">
            {isLoading && <CircularProgress />}
            <Card className='object-cover text-center mx-auto' elevation={3}>
                <CardContent
                    onLoad={() => setIsLoading(false)}
                    className={`bg-[#ebebf0] ${isLoading ? 'hidden' : ''}`}>
                    <img
                        src={sticker.imageUrl}
                        alt={sticker.name}
                        className="h-[30vh] w-[35vh] p-2 md:w-[25vh] md:h-[30vh] object-cover text-center mx-auto"
                    />
                    <button
                        onClick={() => openPopup(sticker._id)}
                        className="border-[none] rounded-[4px] bg-purple-800 text-[#fff] h-[25px] w-[80px] md:h-[25px] md:w-[80px] lg:h-[35px] lg:w-[90px] text-[15px] cursor-pointer transition-opacity duration-500 opacity-70 mt-[8px]"
                    >
                        Order Now
                    </button>
                    <HalfPopup
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

export default HalfCard;
