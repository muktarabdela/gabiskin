import { useEffect, useState } from "react";
import axios from "../../Axios";
import Pagination from '../stickers/Pagination';
import HalfCard from "./HalfCard";

const LaptopSkin = ({ category }) => {
    const [stickersData, setStickersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const stickersPerPage = 8;

    useEffect(() => {
        const fetchStickersByCategory = async () => {
            try {
                const response = await axios.get(`/stickers/stickers-withCategory?category=${category}`);
                setStickersData(response.data.stickers);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
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


    function CircularProgress() {
        return (
            <div className="flex items-center justify-center mt-7">

                <div className="border-t-4 border-blue-500 border-solid h-[3em] w-[3em] rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <>
            {isLoading ? (
                <div className="flex items-center justify-center my-8">
                    <CircularProgress />
                </div>
            ) : stickersData.length === 0 ? (
                <div className="text-center text-lg">
                    <p>Stickers are on the way! Please wait or refresh.</p>
                    <CircularProgress />
                </div>
            ) : (
                <>
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
                </>
            )}
        </>
    );
};

export default LaptopSkin;
