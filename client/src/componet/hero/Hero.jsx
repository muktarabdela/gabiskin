import React from "react";
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
            <button className="hidden md:block">◀</button>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev" onClick={onClick} style={customArrowStyleRight}>
            <button className="hidden md:block">▶</button>
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
        <div className="heroSecMainParent mb-[50px]">
            <p className="text-4xl pt-20 text-center welcomStore">WELCOME TO OUR STORE</p>

            <Slider {...sliderSettings}>
                <div className="first-slide">
                    <img src={heroOne} alt="Hero One" className="w-300" />
                    <button></button>
                </div>
                <div className="second-slide">
                    <img src="" alt="Hero Two" className="w-300" />
                    <button></button>
                </div>
                <div className="third-slide">
                    <img src={heroOne} alt="Hero One" className="w-300" />
                    <button></button>
                </div>
            </Slider>
        </div>
    );
};

export default Hero;
