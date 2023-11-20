import React from "react";
import { Link } from "react-router-dom";
import './Hero.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroOne from "../../../public/images/hero-1.png";

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
            <p className="text-4xl pt-20 text-center welcomStore">WELCOME TO OUR STORE</p>

            <Slider {...sliderSettings}>
                <div className="first-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[40px] md:pt-[90px] lg:ml-[150px] mx-auto">
                            <p className="mb-10 mt-2 leading-none text-xl font-semibold text-center text-white">
                                Elevate your experience, shield your
                                <br className="my-2" />
                                laptop with Gabi premium Laptop Skin!
                                <br /> Unleash your vibe with Gabi Skin.
                            </p>

                            <Link to="/contact"
                                className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
                            >
                                Contact us
                            </Link>
                        </div>
                        <img src={heroOne} alt="Hero One" className="w-300" />
                    </div>
                </div>
                <div className="second-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[40px] md:pt-[90px] lg:ml-[150px] mx-auto">
                            <p className="text-sm uppercase">Services</p>
                            <p className="text-3xl font-bold">Hello world</p>
                            <p className="mb-10 mt-2 leading-none">
                                Carousel with TailwindCSS and jQuery
                            </p>
                            <Link to="/contact"
                                className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
                            >
                                Contact us
                            </Link>
                        </div>
                        <img src={heroOne} alt="Hero One" className="w-300" />
                    </div>
                </div>
                <div className="third-slide">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:w-1/2 pt-[30px] md:pt-[90px] lg:ml-[150px] mx-auto">
                            <p className="text-sm uppercase">Services</p>
                            <p className="text-3xl font-bold">Hello world</p>
                            <p className="mb-10 mt-2 leading-none">
                                Carousel with TailwindCSS and jQuery
                            </p>
                            <Link to="/contact"
                                className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
                            >
                                Contact us
                            </Link>
                        </div>
                        <img src={heroOne} alt="Hero One" className="w-300" />
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default Hero;
