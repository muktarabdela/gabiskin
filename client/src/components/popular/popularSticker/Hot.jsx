import AddToCartPopup from "../../popup/AddToCartPopup"; // Import AddToCartPopup
import HotCard from "./HotCard";
import { useState, useEffect } from "react";
import axios from "../../../Axios";
import "./hot.css";

function Hot() {
    const [hotStickers, setHotStickers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [selectedStickerId, setSelectedStickerId] = useState(null);

    useEffect(() => {
        const fetchHot = async () => {
            try {
                const response = await axios.get("/stickers/stickers-withCategory?category=popular");
                setHotStickers(response.data.stickers);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching stickers:', error);
            }
        }
        fetchHot();
    }, []);

    // Define your onAddToCart function here
    const onAddToCart = (size, price) => {
        // Implement your cart functionality here
        console.log("Adding to cart: Size -", size, "Price -", price);
    };

    return (
        <div className="gabiskin__hot">
            <h1 className="gabiskin__hot-title mb-0">Popular Stickers</h1>
            <div className="gabiskin__hot-main">
                <ul className="gabiskin__hot-main-ul">
                    {hotStickers?.map((sticker) => (
                        <HotCard
                            key={sticker._id}
                            sticker={sticker}
                            onAddToCart={onAddToCart}/>
                    ))}
                </ul>
            </div>

            {showPopup && (
                <AddToCartPopup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    stickerId={selectedStickerId}
                    onAddToCart={onAddToCart}
                    isFocused={index === focusedIndex}
                    selectedStickerId={selectedStickerId}

                />
            )}
        </div>
    );
}

export default Hot;
