import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../store/CartSlice';
import Header from "../header/Header";
import { Link } from "react-router-dom";

function Cart() {
  const cartStickers = useSelector((state) => state.cart.stickers);
  const dispatch = useDispatch();

  const updateCartCount = (newCount) => {
  };
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    const newTotalQuantity = cartStickers.reduce((total, sticker) => total + sticker.quantity, 0);
    updateCartCount(newTotalQuantity);
  }
  const handleIncrementQuantity = (itemId, itemPrice) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrementQuantity = (itemId, itemPrice) => {
    dispatch(decrementQuantity(itemId));
  };

  const totalAmountWithoutDiscount = cartStickers.reduce((total, sticker) => total + sticker.price * sticker.quantity, 0);

  const totalAmountWithDiscount = totalAmountWithoutDiscount / 5;
  console.log(totalAmountWithoutDiscount)


  return (
    <>
      <div>
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n    @layer utilities {\n    input[type="number"]::-webkit-inner-spin-button,\n    input[type="number"]::-webkit-outer-spin-button {\n      -webkit-appearance: none;\n      margin: 0;\n    }\n  }\n',
          }}
        />
        <div className="h-full bg-none pt-20">
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {cartStickers.length === 0 ? (
                <Link to='/'>
                  <div className="flex items-center justify-center h-48 text-2xl">
                    <p className="text-center text-gray-200">
                      Your cart is empty.{" "}
                      <span className="text-blue-700 font-bold">Start shopping now!</span>
                    </p>
                  </div>
                </Link>

              ) : (

                cartStickers.map((sticker) => (
                  <div key={sticker.id} className="justify-between mb-6 rounded-lg bg-white p-6 w-[38vh] md:w-full lg:w-full mx-auto shadow-md sm:flex sm:justify-start">
                    <img
                      src={sticker.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          <span>category</span>  {sticker.category}
                        </h2>
                        <p className="mt-1 text-[17px] text-gray-700">
                          <span className="text-[15px]">sticker size </span>
                          {sticker.size}</p>
                        <p className="mt-1 text-[18px] text-gray-700">
                          <span className="text-[15px]">sticker price </span>  {sticker.price}  <span>ETB</span></p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-r 
                text-purple-700 text-4xl py-1 px-3"
                            onClick={() => handleDecrementQuantity(sticker.id, sticker.price)}
                          >
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border text-black text-center text-[1.1em] outline-none"
                            type="number"
                            value={sticker.quantity}
                            min={1}
                            onChange={(e) => updateQuantity(sticker.id, e.target.value)}
                          />
                          <span
                            className="cursor-pointer rounded-r text-4xl text-green-700 py-1 px-3 duration-100 hover-bg-blue-500 hover-text-blue-50"
                            onClick={() => handleIncrementQuantity(sticker.id, sticker.price)}
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{sticker.price} ETB</p>
                        </div>
                        <span
                          className="
                            cursor-pointer text-red-700 py-1 mt-2"
                          onClick={() => handleRemoveFromCart(sticker.id, sticker.price)}
                        >
                          <svg
                            className="w-[2.5em] ml-5"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>

                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>
            <div className="mt-6 mb-24 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>

                <p className="text-gray-700">
                  {totalAmountWithoutDiscount.toFixed(2)} ETB
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-700">Delivery</p>
                <p className="text-gray-700">Free</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold text-black">20% initial payment</p>
                <div>
                  <p className="text-gray-700 text-lg">
                    {totalAmountWithDiscount.toFixed(2)} ETB

                  </p>
                </div>
              </div>
              <Link to="/checkout">
                {totalAmountWithoutDiscount < 250 ?
                  <Link to='/'>
                    <p p className="text-red-500 mt-2">
                      we receive Minimum 250 ETB worth order.
                    </p></Link>

                  : ""
                }
                <button
                  className={`mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover-bg-blue-600 ${totalAmountWithoutDiscount < 250 && "cursor-not-allowed bg-gray-300"}`}
                  disabled={totalAmountWithoutDiscount < 250}
                  title={totalAmountWithoutDiscount < 250 ? "For orders total value must be more than 250 ETB" : ""}
                >
                  Check out
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Header updateCartCount={updateCartCount} />
      </div >
    </>
  );
}

export default Cart;