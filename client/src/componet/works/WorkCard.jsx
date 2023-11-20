import React, { useEffect, useState } from 'react';
import './workcard.css';
import axios from '../../Axios';

const WorkCard = () => {
  const [renderedImages, setRenderedImages] = useState(10);
  const [stickersData, setStickersData] = useState([]);

  useEffect(() => {
    const fetchStickersByCategory = async () => {
      try {
        // Assuming you have a variable 'half' defined somewhere
        const response = await axios.get(`/stickers/stickers-withCategory?category=half`);
        setStickersData(response.data.stickers);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };

    fetchStickersByCategory();
  }, []);

  const midpointIndex = Math.floor(stickersData.length / 2);

  return (
    <>
      <section className="u-align-center u-clearfix u-section-1" id="sec-ef66">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h1 className="work-title">Our Work</h1>
          <div className="mr-[10px]">
            <div className="u-repeater u-repeater-1 my-[20px]!important">
              {stickersData.slice(0, midpointIndex).map((sticker, index) => (
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
              {renderedImages < stickersData.length && (
                <div className="mb-6 text-center md:text-left lg:text-center lg:mt-[250px]">
                  <button
                    className="border-[none] rounded-[4px] bg-purple-800 text-[#fff] h-[35px] w-[90px] text-[15px] cursor-pointer [transition:0.5s]  opacity-70 mt-[8px]"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkCard;
