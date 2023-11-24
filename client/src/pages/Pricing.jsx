import React, { useEffect } from 'react'
import PriceCard from '../componet/PriceCard/PriceCard'

const Pricing = () => {
    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo(0, 0);
    }, []);
    return (
        <PriceCard />
    )
}

export default Pricing