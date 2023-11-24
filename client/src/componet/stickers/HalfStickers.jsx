import { useEffect, useState } from "react";
import axios from "../../Axios";
import Pagination from './Pagination';
import HalfCard from "./HalfCard";

const HalfStickers = ({ category }) => {
    const [stickersData, setStickersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const stickersPerPage = 8;

    useEffect(() => {
        const fetchStickersByCategory = async () => {
            try {
                const response = await axios.get(`/stickers/stickers-withCategory?category=half`);
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
        <div>
            <h1 className="flex justify-center items-center text-center text-3xl  font-thin my-7">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                    Half Skin Package
                </span>
            </h1>
            <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentStickers.map((sticker) => (
                    <HalfCard key={sticker._id} sticker={sticker} />
                ))}
            </div>
            <Pagination
                active={currentPage}
                itemsCountPerPage={stickersPerPage}
                totalItemsCount={stickersData.length}
                onChange={handlePageChange}
            />
        </div>

    );
};

export default HalfStickers;
