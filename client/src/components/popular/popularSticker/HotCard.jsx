import React, { useState } from 'react';
import './hot.css';
import { Link } from 'react-router-dom';
import AddToCartPopup from '../../popup/AddToCartPopup'; // Import AddToCartPopup

function HotCard({ sticker, onAddToCart }) {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="gabiskin__hot-main__card">
            <Link className="text-[#f4f4f5] hover:transform-[scale(1.09)]">
                <p className="hot-title">{sticker.title}</p>
                <img
                    className="gabiskin__hot-main__card-img"
                    src={sticker.imageUrl}
                    alt={sticker.name}
                />
                <p className="hot-price">
                    ETB 50
                    <small>
                        <del>ETB 100</del>
                    </small>
                </p>
            </Link>
            <button className="hot__price-button" onClick={() => setShowPopup(true)}>
                Order Now
            </button>
            {showPopup && (
                <AddToCartPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    stickerId={sticker._id}
                    onAddToCart={onAddToCart}
                />
            )}
        </div>
    );
}

export default HotCard;
