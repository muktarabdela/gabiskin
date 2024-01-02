import React, { useEffect, useState } from 'react';
// import './workcard.css';
import axios from '../../Axios';
import Pagination from '../stickers/Pagination';
import { Link } from 'react-router-dom';
import Telegram from '../../../public/images/telegram.png';
import tiktok from '../../../public/images/tiktok.png';
import instagram from '../../../public/images/instagram.png';
import youtube from '../../../public/images/youtube.png';
const WorkCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [stickersData, setStickersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStickersByCategory = async () => {
      try {
        const response = await axios.get(`/stickers/stickers-withCategory?category=works`);
        setStickersData(response.data.stickers);
      } catch (error) {
        console.error('Error fetching stickers:', error);
      }
    };
    fetchStickersByCategory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stickersData.slice(indexOfFirstItem, indexOfLastItem).reverse();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const SocialMediaLink = ({ href, image, title }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title}>
      <img src={image} alt={title} className="w-10 h-10 cursor-pointer transform hover:scale-110 transition-transform" />
    </a>
  );


  function CircularProgress() {
    return (
      <div className="flex items-center justify-center mt-4">
        <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
      </div>
    )
  }
  const socialMediaLinks = {
    telegram: 'http://t.me/gabiskin',
    tiktok: 'https://www.tiktok.com/@gabiskin',
    instagram: ' http://instagram.com/gabiskin_',
    youtube: ' https://youtube.com/@gabiskin_?si=OKwEAlr-AWUkGtS0',
  };
  return (
    <>
      <div className=''>
        <h1 className="text-center text-[1.6em] pt-[80px] mx-[0] my-6 [transition:all_0.3s_ease-in-out] font-mono">ለላፕቶፓቹን ጋቢ ደረረረብ </h1>
        {isLoading && <CircularProgress />}
        <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 lg:row-cols-3 gap-4">
          {currentItems.map((sticker, index) => (
            <div
              key={index}
              className={`u-align-left u-container-style u-list-item u-repeater-item u-list-item-1 ${isLoading ? 'hidden' : ''}`}
              data-animation-name="customAnimationIn"
              data-animation-duration={1500}
              data-animation-delay={250 + index * 250}
              onLoad={() => setIsLoading(false)}
            >
              <div className={`u-container-layout u-similar-container u-container-layout-1 `}>
                <img
                  className={`w-[60vh] rounded-lg u-expanded-width u-image u-image-1 width-main ${isLoading ? 'hidden' : ''}`}
                  src={sticker.imageUrl}
                  alt={sticker.name}
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
      </div>
      <div className='mx-auto'>
        <Pagination
          active={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={stickersData.length}
          onChange={paginate}
        />
      </div>
      <div className="text-center my-8">
        <p className="text-2xl font-bold text-gray-200 mb-4">
          Gabi Laptop skins are made of durable material that enhances your device's overall appearance and protects it from scuffs and scratches. 😋
        </p>
        <ul className="list-disc list-inside text-lg text-gray-300">
          <li className="mb-2">Prevents scratches</li>
          <li className="mb-2">Express your style and personality</li>
          <li className="mb-2">Easily removable and replaceable</li>
          <li className="mb-2">Custom designs</li>
          <li className="mb-2">The colors NEVER come off</li>
          <li className="mb-2">Totally affordable</li>
          <li className="mb-2">Water-resistant</li>
          <li className="mb-2">Scratch-resistant</li>
        </ul>
        <p className="text-lg text-green-500 mt-4">
          🚚 Enjoy free delivery to every corner of Ethiopia!
        </p>
      </div>
      <div className="flex justify-center">
        <Link to="/">
          <button className=' bg-red-600  my-2 py-1 px-1 rounded'>order now</button>
        </Link>
      </div>
      <h3 className="text-center mt-8 text-lg font-semibold">👇CHECK OUT OUR SOCIAL MEDIA LINK</h3>
      <div className="flex justify-around mx-auto mt-4 w-[13em]">
        <SocialMediaLink href={socialMediaLinks.telegram} image={Telegram} title="Telegram" />
        <SocialMediaLink href={socialMediaLinks.tiktok} image={tiktok} title="tiktok" />
        <SocialMediaLink href={socialMediaLinks.youtube} image={youtube} title="youtube" />
        <SocialMediaLink href={socialMediaLinks.instagram} image={instagram} title="instagram" />

      </div>
    </>
  );
};

export default WorkCard;
