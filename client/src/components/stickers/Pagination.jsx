import React from 'react';
// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

const Pagination = ({ active, itemsCountPerPage, totalItemsCount, onChange }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-1 mt-4">
            {active > 1 && (
                <button
                    className="text-blue-500 px-3 py-1 border border-blue-500 rounded cursor-pointer flex items-center gap-1"
                    onClick={() => onChange(active - 1)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                </button>
            )}

            <ul className="flex space-x-2">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            className={`${active === number ? 'bg-blue-500 text-white' : 'text-green-500'
                                } px-2 py-1 border  rounded cursor-pointer`}
                            onClick={() => onChange(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>

            {active < totalPages && (
                <button
                    className="text-green-600-500 px-2 py-1 border border-green-400 rounded cursor-pointer flex items-center gap-1"
                    onClick={() => onChange(active + 1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default Pagination;
