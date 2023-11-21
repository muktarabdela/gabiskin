import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroOne from "../../../public/images/hero-1.png";
import heroTwo from "../../../public/images/imgSliderOne.png";
import heroThree from "../../../public/images/ourWork/19.png";

const customArrowStyleLeft = {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#f5f5f5",
    fontSize: "20px",
    borderRadius: "50%",
    transition: "all 0.3s ease-in-out",
};
const customArrowStyleRight = {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#f5f5f5",
    fontSize: "20px",
    borderRadius: "50%",
    transition: "all 0.3s ease-in-out",
};


const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev" onClick={onClick} style={customArrowStyleLeft}>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev" onClick={onClick} style={customArrowStyleRight}>
        </div>
    );
};

const Hero = () => {
    const sliderSettings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb white-dots",
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="heroSecMainParent mb-[150px]">
            <p className="text-2xl pt-20 text-center font-bold text-gray-300 sm:text34xl md:text-2xl lg:text-3xl xl:text-5xl mb-5">
                Welcome to <span className="text-blue-500">Gabi Sticker</span> Home
            </p>


            <Slider {...sliderSettings}>
                <div className="first-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[40px] md:pt-[90px] lg:ml-[150px] mx-auto w-[17em]">
                            <p className="text-xs text-gray-500 uppercase mb-2">Services</p>
                            <p className="text-3xl font-bold mb-4">Enhance Your Experience</p>
                            <p className="leading-relaxed text-lg ">
                                Protect your laptop from scratches and small damages. Unleash your vibe with Gabi premium stickers!
                            </p>
                        </div>
                        <img src={heroOne} alt="Hero One" className="w-full md:w-auto" />
                    </div>
                </div>

                <div className="second-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[40px] md:pt-[90px] lg:ml-[150px] mx-auto w-[18em]">
                            <p className="text-xs text-gray-500 uppercase mb-2">Services</p>
                            <p className="text-3xl font-bold mb-4">Gabi skin that is thin👌, light 🤙and stylish!😎</p>
                            <p className="leading-relaxed text-lg mb-5">
                                Our laptop skins are also available as an exact fit for all Laptop. Go to your favorite design and select the relevant size. we'll do the rest
                            </p>
                        </div>
                        <img src={heroTwo} alt="Hero One" className="w-[19em] mb-3 md:w-auto lg:w-auto" />
                    </div>
                </div>
                <div className="third-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[40px] md:pt-[90px] lg:ml-[150px] mx-auto w-[18em] md:mr-6 lg:mr:7">
                            <p className="text-xs text-gray-500 uppercase mb-2">Services</p>
                            <p className="text-3xl font-bold mb-4">Get your old laptop looking   🔥
                            </p>
                            <p className="leading-relaxed text-lg mb-[5em] md:mb-0 lg:mb-0">
                                Get your custom Laptop skin cover done with any image of your choice
                            </p>
                        </div>
                        <img src={heroThree} alt="Hero One" className="w-full md:w-auto" />
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Hero;
