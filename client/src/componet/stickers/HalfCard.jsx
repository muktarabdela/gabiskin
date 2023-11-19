import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HalfPopup from './HalfPopup';

function HalfCard({ sticker, onPageChange }) {
    const [selectedStickerId, setSelectedStickerId] = useState(sticker._id);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    return (
        <div className="">
            <Card className='object-cover text-center mx-auto' elevation={3}>
                <CardContent className='bg-[#ebebf0]'>
                    <img
                        src={sticker.imageUrl}
                        alt={sticker.name}
                        className="h-[30vh] w-[40vh] md:w-[25vh] md:h-[30vh] object-cover text-center mx-auto"
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
