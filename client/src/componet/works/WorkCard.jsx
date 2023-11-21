import React, { useEffect, useState } from 'react';
import './workcard.css';
import axios from '../../Axios';
import Pagination from '../stickers/Pagination'; // Adjust the import path based on your project structure

const WorkCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [stickersData, setStickersData] = useState([]);

  useEffect(() => {
    const fetchStickersByCategory = async () => {
      try {
        const response = await axios.get(`/stickers/stickers-withCategory?category=half`);
        setStickersData(response.data.stickers);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickersByCategory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stickersData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="u-align-center u-clearfix u-section-1" id="sec-ef66">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h1 className="work-title">Our Work</h1>
          <div className="mr-[10px]">
            <div className="u-repeater u-repeater-1 my-[20px]!important">
              {currentItems.map((sticker, index) => (
                <div
                  key={index}
                  className="u-align-left u-container-style u-list-item u-repeater-item u-list-item-1"
                  src=""
                  data-animation-name="customAnimationIn"
                  data-animation-duration={1500}
                  data-animation-delay={250 + index * 250}
                >
                  <div className="u-container-layout u-similar-container u-container-layout-1">
                    <img
                      className="u-expanded-width u-image u-image-1 width-main"
                      src={sticker.imageUrl}
                      alt={sticker.name} // Don't forget alt attribute
                      data-image-width={988}
                      data-image-height={920}
                      data-animation-name="flipIn"
                      data-animation-duration={1500}
                      data-animation-direction="X"
                      data-animation-delay={750 + index * 250}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              active={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={stickersData.length}
              onChange={paginate}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkCard;
