import { useState } from "react";
import "../stickers/Category.css";
import LaptopSkin from "./LaptopSkin";

const SkinCategory = () => {
    const [selectedCategory, setSelectedCategory] = useState("abstract");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="gabiskin_category ">
                <h1 className="gabiskin__category-title">Category</h1>
                <div className="gabiskin__category-main__title overflow-x-auto whitespace-nowrap">

                    <p className={`top ${selectedCategory === "sport" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("sport")}>Sport</p>


                    <p className={`top ${selectedCategory === "anime" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("anime")}>Anime</p>


                    <p className={`top ${selectedCategory === "animation" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("animation")}>Animation M</p>

                    <p className={`top ${selectedCategory === "cars" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("cars")}>Cars</p>

                    <p className={`top ${selectedCategory === "Black-ish" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Black-ish")}>Black-ish</p>

                    <p className={`top ${selectedCategory === "abstract" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("abstract")}>Abstract</p>

                    <p className={`top ${selectedCategory === "flower" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("flower")}>Flowers</p>

                    <p className={`top ${selectedCategory === "Girlish" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Girlish")}>Girlish</p>


                    <p className={`top ${selectedCategory === "Movie_and_game" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Movie_and_game")}>Movie and game</p>

                    <p className={`top ${selectedCategory === "Music_and_celebrities" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Music_and_celebrities")}>Music and celebrities</p>

                    <p className={`top ${selectedCategory === "Natural" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Natural")}>Natural </p>

                    <p className={`top ${selectedCategory === "Pattern" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Pattern")}>Pattern</p>

                    <p className={`top ${selectedCategory === "Qoute" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Qoute")}>Qoute</p>

                    <p className={`top ${selectedCategory === "Regional_cultural" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("Regional_cultural")}> Regional cultural</p>


                    <p className={`top ${selectedCategory === "wood" ? "selected border-b  p-1 rounded-lg text-orange-400 " : ""}`} onClick={() => handleCategoryChange("wood")}>Wood</p>


                </div>
            </div>
            <LaptopSkin category={selectedCategory} />
        </>
    );
};
export default SkinCategory;
