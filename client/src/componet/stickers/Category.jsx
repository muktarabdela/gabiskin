import { useState } from "react";
import Sticker from "../stickers/Stickers";
import "./category.css";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState("programming");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="gabiskin_category">
                <h1 className="gabiskin__category-title">Category Stickers</h1>
                <div className="gabiskin__category-main__title">
                    <p className={`top ${selectedCategory === "programming" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("programming")}>Programming</p>
                    <p className={`top ${selectedCategory === "Movies" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Movies")}>Movie</p>
                    <p className={`top ${selectedCategory === "Music" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Music")}>Music</p>
                    <p className={`top ${selectedCategory === "Amharic" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Amharic")}>Amharic</p>
                    <p className={`top ${selectedCategory === "Football" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Football")}>Football</p>
                    <p className={`top ${selectedCategory === "holy" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("holy")}>Holy</p>
                    <p className={`top ${selectedCategory === "Animation" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Animation")}>Animation</p>
                    <p className={`top ${selectedCategory === "Anime" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Anime")}>Anime</p>
                    <p className={`top ${selectedCategory === "" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Series_movie")}>Series</p>
                    <p className={`top ${selectedCategory === "English_tips" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("English_tips")}>English</p>
                    <p className={`top ${selectedCategory === "Gaming" ? "selected text-purple-500 border-b-2" : ""}`} onClick={() => handleCategoryChange("Gaming")}>Gaming</p>
                </div>
            </div>
            <Sticker category={selectedCategory} />
        </>
    );
};

export default Category;
