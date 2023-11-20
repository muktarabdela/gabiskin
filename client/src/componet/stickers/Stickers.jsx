import { useEffect, useState } from "react";
import StickersCard from "./StickersCard";
import axios from "../../Axios";
import Pagination from './Pagination'; 

const Sticker = ({ category }) => {
    const [stickersData, setStickersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 8;

    useEffect(() => {
        const fetchStickersByCategory = async () => {
            try {
                const response = await axios.get(`/stickers/stickers-withCategory?category=${category}`);
                setStickersData(response.data.stickers);
            } catch (error) {
                console.error('Error fetching stickers:', error);
            }
        }

        fetchStickersByCategory();
    }, [category]);

    const indexOfLastSticker = currentPage * stickersPerPage;
    const indexOfFirstSticker = indexOfLastSticker - stickersPerPage;
    const currentStickers = stickersData.slice(indexOfFirstSticker, indexOfLastSticker);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentStickers.map((sticker) => (
                    <StickersCard key={sticker._id} sticker={sticker} />
                ))}
            </div>
            <Pagination
                active={currentPage}
                itemsCountPerPage={stickersPerPage}
                totalItemsCount={stickersData.length}
                onChange={handlePageChange}
            />
        </>

    );
};

export default Sticker;
