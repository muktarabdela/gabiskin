import React from "react";
import Part1 from "../../../public/images/part1.png";
import Part2 from "../../../public/images/part2.png";
import Part3 from "../../../public/images/part3.png";
import Part4 from "../../../public/images/part4.png";
import Part5 from "../../../public/images/part5.jpg";

const Part = () => {
    return (
        <div className="container mx-auto pt-16 px-8">
            <h2 className="text-3xl font-semibold mb-2 text-center">Our Partners</h2>

            <div className="flex -x-auto justify-center items-center mt-16">
                {/* Part 1 */}
                <div className="rounded-lg text-center">
                    <img
                        src={Part2}
                        alt="Part 2"
                        className="mb-4 rounded-md max-w-[150px] w-[50px]"
                    />
                </div>

                {/* Part 2 */}
                <div className=" rounded-lg text-center">
                    <img
                        src={Part1}
                        alt="Part 1"
                        className="mb-4 rounded-md max-w-[150px] w-[6em]"
                    />
                </div>

                {/* Part 3 */}
                <div className="p- rounded-lg text-center">
                    <img
                        src={Part3}
                        alt="Part 3"
                        className="mb-4 rounded-md max-w-[150px] w-[50px]"
                    />
                </div>

                {/* Part 4 */}
                <div className="p-1 rounded-lg text-center">
                    <img
                        src={Part4}
                        alt="Part 4"
                        className="mb-4 rounded-md max-w-[150px] w-[50px]"
                    />
                </div>

                {/* Part 5 */}
                <div className="p- rounded-lg text-center">
                    <img
                        src={Part5}
                        alt="Part 5"
                        className="rounded-md max-w-[150px] w-[50px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Part;