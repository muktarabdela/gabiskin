import React from "react";
import Part1 from "../../../public/images/part1.png";
import Part2 from "../../../public/images/part2.png";
import Part3 from "../../../public/images/part3.png";
import Part4 from "../../../public/images/part4.png";
import Part5 from "../../../public/images/part5.jpg";


const Part = () => {
    return (
        <div className="container mx-auto pt-16 px-8 ">
            <h2 className="text-3xl font-semibold mb-6 text-center">Our Partner</h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center mt-16">
                {/* Part 1 */}
                <div className="p-4 rounded-lg  text-center">
                    <img src={Part1} alt="Part 1" className="mb-4 rounded-md" />
                </div>

                {/* Part 2 */}
                <div className="p-4 rounded-lg  text-center">
                    <img
                        src={Part2}
                        alt="Part 2"
                        className="mb-4 rounded-md w-[150px] md:ml-12 lg:ml-2"
                    />
                </div>

                {/* Part 3 */}
                <div className="p-4 rounded-lg  text-center">
                    <img
                        src={Part3}
                        alt="Part 3"
                        className="mb-4 rounded-md w-[150px] md:ml-12 lg:ml-2"
                    />
                </div>

                {/* Part 4 */}
                <div className="p-4 rounded-lg  text-center">
                    <img src={Part4} alt="Part 4" className="mb-4 rounded-md" />
                </div>

                {/* Part 5 */}
                <div className="p-4 rounded-lg text-center">
                    <img src={Part5} alt="Part 5" className="rounded-md w-[10em]" />
                </div>
            </div>
        </div>
    );
};

export default Part;