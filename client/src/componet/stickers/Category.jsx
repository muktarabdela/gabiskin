import { useState } from "react";
import Sticker from "../stickers/Stickers";
import "./category.css";

const categories = [
    "Movies",
    "programming",
    "Music",
    "Amharic",
    "Football",
    "holy",
    "Animation",
    "Anime",
    "Series_movie",
    "English_tips",
    "Gaming",
];

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState("Movies");

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="gabiskin_category ">
                <h1 className="gabiskin__category-title">Category Stickers</h1>
                <div className="gabiskin__category-main__title overflow-x-auto whitespace-nowrap">
                    {categories.map((category) => (
                        <p
                            key={category}
                            className={`top ${selectedCategory === category ? "selected text-purple-500 border-b-2" : ""}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </p>
                    ))}
                </div>
            </div>
            <Sticker category={selectedCategory} />
        </>
    );
};

export default Category;
