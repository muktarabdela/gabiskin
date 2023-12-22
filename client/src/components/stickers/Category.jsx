import { useState } from "react";
import Sticker from "../stickers/Stickers";
import "./category.css";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState("New_stickers");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="gabiskin_category ">
                <h1 className="gabiskin__category-title">Category Stickers</h1>
                <div className="gabiskin__category-main__title overflow-x-auto whitespace-nowrap">
                    <p className={`top ${selectedCategory === "New_stickers" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("New_stickers")}>New stickers</p>
                    <p className={`top ${selectedCategory === "christmas" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("christmas")}>Christmas</p>
                    <p className={`top ${selectedCategory === "Movies" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Movies")}>Movie</p>
                    <p className={`top ${selectedCategory === "programming" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("programming")}>Programming</p>
                    <p className={`top ${selectedCategory === "Music" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Music")}>Music</p>
                    <p className={`top ${selectedCategory === "Amharic" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Amharic")}>Culther</p>
                    <p className={`top ${selectedCategory === "Football" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Football")}>Sports</p>
                    <p className={`top ${selectedCategory === "holy" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("holy")}>Holy</p>
                    <p className={`top ${selectedCategory === "Animation" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Animation")}>Cartoon</p>
                    <p className={`top ${selectedCategory === "Anime" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Anime")}>Anime</p>
                    <p className={`top ${selectedCategory === "" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Series_movie")}>Series</p>
                    <p className={`top ${selectedCategory === "English_tips" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("English_tips")}>english quotes</p>
                    <p className={`top ${selectedCategory === "Gaming" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Gaming")}>Gaming</p>
                </div>
            </div>
            <Sticker category={selectedCategory} />
        </>
    );
};

export default Category;
