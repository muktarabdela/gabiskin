import AddToCartPopup from "../../popup/AddToCartPopup"; // Import AddToCartPopup
import PoplarSkinCard from "./PoplarSkinCard";
import { useState, useEffect } from "react";
import axios from "../../../Axios";
import "./popularSkin.css";

function PopularSkin() {
    const [hotStickers, setHotStickers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStickerId, setSelectedStickerId] = useState(null);
    useEffect(() => {
        const fetchHot = async () => {
            try {
                const response = await axios.get("/stickers/stickers-withCategory?category=most_popular");
                setHotStickers(response.data.stickers);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching stickers:', error);
            }
        }
        fetchHot();
    }, []);

    const onAddToCart = (size, price) => {
        console.log("Adding to cart: Size -", size, "Price -", price);
    };

    return (
        <div className="mt-6">
            <h1 className=" bg-gradient-to-r text-center text-[3em] mb-5 from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Laptop Skins
            </h1>

            <h1 className="text-[1.5em] font-[1000] text-center opacity-100">Popular laptop skin</h1>
            <div className="gabiskin__hot-main">
                <ul className="gabiskin__hot-main-ul">
                    {hotStickers?.map((sticker) => (
                        <PoplarSkinCard
                            key={sticker._id}
                            sticker={sticker}
                            onAddToCart={onAddToCart}

                        />
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

export default PopularSkin;
