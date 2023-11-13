import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import SellIcon from "@mui/icons-material/Sell";
import PaymentIcon from "@mui/icons-material/Payment";

function Advantage() {
    return (
        <div className="mb-24">
            <h1 className="text-3xl font-semibold text-center my-5">
                Our Advantages
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center mt-16 ml-20 sm:ml-32 md:ml-32 lg:mx-32">

                {/* Advantage 1 */}
                <div className="flex items-center">
                    <div className="text-purple-600 text-3xl mr-5">
                        <LocalShippingIcon />
                    </div>
                    <div className="right">
                        <strong>
                            <p>Express Delivery</p>
                        </strong>
                        <small>
                            <p>Ships in 24 Hours</p>
                        </small>
                    </div>
                </div>

                {/* Advantage 2 */}
                <div className="flex items-center my-5">
                    <div className="text-purple-600 text-3xl mr-5">
                        <SecurityIcon />
                    </div>
                    <div className="right">
                        <strong>
                            <p>Brand Warranty</p>
                        </strong>
                        <small>
                            <p>100% Original products</p>
                        </small>
                    </div>
                </div>

                {/* Advantage 3 */}
                <div className="flex items-center mb-5">
                    <div className="text-purple-600 text-3xl mr-5">
                        <SellIcon />
                    </div>
                    <div className="right">
                        <strong>
                            <p>Exciting Deals</p>
                        </strong>
                        <small>
                            <p>On all prepaid orders</p>
                        </small>
                    </div>
                </div>

                {/* Advantage 4 */}
                <div className="flex items-center">
                    <div className="text-purple-600 text-3xl mr-5">
                        <PaymentIcon />
                    </div>
                    <div className="right">
                        <strong>
                            <p>Secure Payments</p>
                        </strong>
                        <small>
                            <p>SSL / Secure Certificate</p>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Advantage;
