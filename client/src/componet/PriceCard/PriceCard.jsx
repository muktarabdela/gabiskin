import React from "react";
import "./pricecard.css"
import mini from "../../../public/images/price.png";
import full from "../../../public/images/price2.png";
import custom from "../../../public/images/price3.png";

function PriceCard() {
  return (
    <div className="gabiskin__price">
      <p className="gabiskin__price-title">Pricing table</p>
      <div className="gabiskin__price-main">
        <div className="pricing-table-wrapper">
          <ul className="pricing-table">
            <li className="pricing-table__item pricing-table__item-three">
              <img
                src={custom}
                alt="custom"
                className="pricing-table__img custom"
              />
              <a href="">
                <h3 className="pricing-table__title">Custom Stickers</h3>
              </a>
              <p className="pricing-table__description">
                <span className="pricing-table__tagline">
                  Here is Price package for our Custom Stickers
                </span>
              </p>
              <ul className="pricing-table__products">
                <li className="pricing-table__product">
                  🎆 Custom Mini-Stickers - 100 ETB
                </li>
                <li className="pricing-table__product margin">💯 Quality</li>
                <li className="pricing-table__product margin-1">
                  💬 By Clints Choice
                </li>
                <li className="pricing-table__product">💬 By Clints Choice</li>
              </ul>
              <a href="">
                <button className="pricing-table__button">continue</button>
              </a>
            </li>
            <li className="pricing-table__item pricing-table__item-one">
              <img src={mini} alt="mini" className="pricing-table__img mini" />
              <a href="">
                <h3 className="pricing-table__title">Mini Stickers</h3>
              </a>
              <p className="pricing-table__description">
                <span className="pricing-table__tagline">
                  Here is Price package for our Mini stickers
                </span>
              </p>
              <ul className="pricing-table__products">
                <li className="pricing-table__product">
                  🔴 Small-sized (5-7 cm) - 30 ETB
                </li>
                <li className="pricing-table__product margin">
                  🟡 Medium-sized (7-10 cm) - 40 ETB
                </li>
                <li className="pricing-table__product pricing-table__product--excluded">
                  🔵 Big-sized (10-15 cm) - 50 ETB
                </li>
              </ul>
              <a href="">
                <button className="pricing-table__button">continue</button>
              </a>
            </li>
            <li
              className="pricing-table__item pricing-table__item--popular pricing-table__item-two"
              data-popular="Popular"
            >
              <img
                src={full}
                alt="full one"
                className="pricing-table__img fullOne"
              />
              <a href="">
                <h3 className="pricing-table__title">Full-Skin Stickers</h3>
              </a>
              <p className="pricing-table__description">
                <span className="pricing-table__tagline">
                  Here is Price package for our Full Skin Stickers
                </span>
              </p>
              <ul className="pricing-table__products">
                <li className="pricing-table__product margin-1">
                  🌓 Half package Laptop skin - sticker only for the back of
                  your screen - 300 ETB
                </li>
                <li className="pricing-table__product">
                  🌕 Full package Laptop skin - Front and back ( For the back of
                  your screen + on the keyboard area ) - 500 ETB
                </li>
              </ul>
              <a href="">
                <button className="pricing-table__button">continue</button>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default PriceCard;