import React, { useState } from 'react';
import './PopularSkin.css';
import { Link } from 'react-router-dom';
import HalfPopup from '../../Laptop_skin/HalfPopup';

function PoplarSkinCard({ sticker }) {
    // console.log(sticker)
    const [selectedStickerId, setSelectedStickerId] = useState(sticker._id);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentRow, setCurrentRow] = useState(0);
    const moveToNextRow = () => {
        setCurrentRow((prevRow) => (prevRow + 1) % numberOfRows);
    };
    const moveToPrevRow = () => {
        setCurrentRow((prevRow) => (prevRow - 1 + numberOfRows) % numberOfRows);
    };
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
        <div>
            {isLoading && <CircularProgress />}
            <div className="m-[5px]"
                onLoad={() => setIsLoading(false)} >
                <Link className={`text-[#f4f4f5] hover:transform-[scale(1.09) ${isLoading ? 'hidden' : ''} `}>
                    <img
                        className="gabiskin__hot-main__card-img mt-6 h-[11em] w-[14em]"
                        src={sticker.imageUrl}
                        alt={sticker.name}
                    />
                    <p className="hot-price">
                        ETB 300
                        <small>
                            <del>ETB 400</del>
                        </small>
                    </p>
                </Link>
                <button
                    onClick={() => openPopup(sticker._id)}
                    className="border-[none] rounded-[2px] bg-[#6b46c1] text-[#fff] h-[30px] w-[100px] text-[15px] cursor-pointer [transition:0.5s] opacity-70 mt-[10px] mx-[50px] mb-[0]">
                    Order Now
                </button>
                <HalfPopup
                    isOpen={isPopupOpen}
                    onClose={closePopup}
                    onAddToCart={handleAddToCart}
                    stickerId={selectedStickerId}
                />
            </div>
        </div>
    );
}

export default PoplarSkinCard;
