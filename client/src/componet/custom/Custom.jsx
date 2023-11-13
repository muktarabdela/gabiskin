import React, { useState } from 'react';
import axios1 from 'axios';
import axios from "../../Axios"
import { addToCart } from '../../store/CartSlice';

import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
} from "@material-tailwind/react";
import { Radio } from '@mui/material';
import { useDispatch } from 'react-redux';

const Custom = () => {
    const [images, setImages] = useState(null);
    const [selectedSize, setSelectedSize] = useState('small');
    const [price, setPrice] = useState(35);
    const dispatch = useDispatch();


    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
        if (newSize === 'large') {
            setPrice(55);
        } else if (newSize === 'medium') {
            setPrice(45);
        } else {
            setPrice(35);
        }
    }

    const handleImageChange = (e) => {
        const files = e.target.files;
        setImages(files);
    };

    const handleUpload = async () => {
        const formData = new FormData();

        const customStickerData = {
            price,
            size: selectedSize,
        };

        for (let i = 0; i < images.length; i++) {
            formData.append('file', images[i]);
            formData.append('upload_preset', 'sticker_upload');
            formData.append('folder', 'custom');

            try {
                const response = await axios1.post(
                    "https://api.cloudinary.com/v1_1/dcug2edrg/image/upload",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                console.log(`Image ${i + 1} uploaded:`, response.data.secure_url);

                const customDataBase = await axios.put('/stickers/get-custom', {
                    imageUrl: response.data.secure_url,
                    ...customStickerData,
                });
                console.log(customDataBase.data.newSticker)

                dispatch(addToCart({
                    _id: customDataBase.data.newSticker._id,
                    price: customDataBase.data.newSticker.price,
                    size: customDataBase.data.newSticker.size,
                    quantity: 1,
                    category: customDataBase.data.newSticker.category,
                    imageUrl: customDataBase.data.newSticker.imageUrl,
                }));

            } catch (error) {
                console.error(`Error uploading image ${i + 1}:`, error);
            }
            formData.delete('file');
            formData.delete('upload_preset');
            formData.delete('folder');
        }
    };


    return (
        <div className="flex flex-col items-center w-full my-10 p-0">
            <Popover>
                <div className='bg-blue-100 p-7 rounded'>
                    <p className="text-blue-800 font-semibold text-[26px]">🎨 Customize Your Stickers!</p>
                    <p className="text-blue-700  text-[18px]">Send us any image, and we'll transform it into high-quality stickers.</p>
                    <p className="text-blue-700 my-2">Express yourself with unique, personalized designs!</p>
                    <PopoverHandler >
                        <Button className='bg-red-600 ml-[14em] my-2'>Send Custom Image</Button>
                    </PopoverHandler>
                </div>
                <PopoverContent className=" grid w-full h-[40em] md:h-[30em] md:w-[50em] sm:w-[28rem] lg:h-[30em] lg:w-[50em] grid-cols-1 sm:grid-cols-2 overflow-hidden p-0">
                    <p className='text-black text-[1.5em] mx-auto mt-[2em] font-semibold'> choose your convince size and price</p>
                    <div className='mx-auto'>
                        <div className='text-black text-[1.4em]'>
                            <Radio
                                className='text-black'
                                id="sizeSmall"
                                value="small"
                                checked={selectedSize === 'small'}
                                onChange={handleSizeChange}
                                name="size" label="Small"
                            />
                            Small
                        </div>
                        <div className='text-black text-[1.4em]'>
                            <Radio
                                value="medium"
                                checked={selectedSize === 'medium'}
                                onChange={handleSizeChange}
                                name="size" label="medium" />
                            medium
                        </div>
                        <div className='text-black text-[1.4em]'>
                            <Radio
                                id="sizeBig"
                                value="large"
                                checked={selectedSize === 'large'}
                                onChange={handleSizeChange}
                                name="size" label="Small" />
                            large
                        </div>
                        <p className="text-gray-700 mt-2 text-[23px]">
                            Price: {price} ETB
                        </p>
                    </div>
                    <div className="mt-[1em] md:mt-[9em] lg:mt-[8em] pl-[9.5em]">
                        <input type='file' onChange={handleImageChange} multiple className="mb-4 pl-3" />
                        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Upload Images
                        </button>
                    </div>

                    <div className="min-h-full !w-full p-3 h-[15em]">
                        <img
                            src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            alt="image"
                            className="h-full w-full rounded-lg object-cover"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>

    );
};

export default Custom;


