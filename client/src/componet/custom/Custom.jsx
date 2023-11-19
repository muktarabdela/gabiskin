import React, { useState } from 'react';
import axios1 from 'axios';
import axios from "../../Axios"
import { addToCart } from '../../store/CartSlice';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

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
        <div className="flex flex-col items-center my-10 p-0">
            <Popover>
                <Card className="mt-6 w-96">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            UI/UX Review Check
                        </Typography>
                        <Typography>
                            The place is close to Barceloneta Beach and bus stop just 2 min by
                            walk and near to &quot;Naviglio&quot; where you can enjoy the main
                            night life in Barcelona.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <PopoverHandler >
                            <Button className='bg-red-600 ml-[14em] my-2'>Send Image</Button>
                        </PopoverHandler>
                    </CardFooter>
                </Card>


                <PopoverContent className="mt-6 w-96">
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
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="multiple_files"
                        >
                            Upload images
                        </label>
                        <input
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="multiple_files"
                            type="file"
                            multiple
                        />
                        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                            Upload Images
                        </button>
                    </div>

                </PopoverContent>
            </Popover>
        </div>

    );
};

export default Custom;


