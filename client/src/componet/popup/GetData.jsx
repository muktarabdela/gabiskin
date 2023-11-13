// ParentComponent.jsx
import React, { useState, useEffect } from 'react';
import AddToCartPopup from './AddToCartPopup';
import axios from '../../Axios';

function GetData() {
    const [stickerData, setStickerData] = useState(null);

    useEffect(() => {
        // Fetch sticker data from your server, e.g., when opening the popup
        const fetchData = async () => {
            try {
                const response = await axios.get('/stickers');
                setStickerData(response.data);
            } catch (error) {
                console.error('Error fetching sticker data:', error);
            }
        };

        fetchData();
    }, []);

    // Rest of your component code

    return (
        <AddToCartPopup
            stickerId={stickerData?._id}
            selectedCategory={stickerData?.category}
            selectedImageUrl={stickerData?.imageUrl}
            stickerData={stickerData}
        />
    );
}

export default GetData;
