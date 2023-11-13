import React, { useState } from 'react'
import './workcard.css'

import our1 from '../../../public/images/ourWork/1.png'
import our2 from '../../../public/images/ourWork/2.png'
import our3 from '../../../public/images/ourWork/3.png'
import our4 from '../../../public/images/ourWork/4.png'
import our5 from '../../../public/images/ourWork/5.png'
import our6 from '../../../public/images/ourWork/6.png'
import our7 from '../../../public/images/ourWork/7.png'
import our8 from '../../../public/images/ourWork/8.png'
import our9 from '../../../public/images/ourWork/9.png'
import our10 from '../../../public/images/ourWork/10.png'
import our11 from '../../../public/images/ourWork/11.png'
import our12 from '../../../public/images/ourWork/12.png'
import our13 from '../../../public/images/ourWork/13.png'
import our14 from '../../../public/images/ourWork/14.png'
import our15 from '../../../public/images/ourWork/15.png'
import our16 from '../../../public/images/ourWork/16.png'
import our17 from '../../../public/images/ourWork/17.png'
import our18 from '../../../public/images/ourWork/18.png'
import our19 from '../../../public/images/ourWork/19.png'
import our20 from '../../../public/images/ourWork/20.png'
import our21 from '../../../public/images/ourWork/21.png'
import our22 from '../../../public/images/ourWork/22.png'
import our23 from '../../../public/images/ourWork/23.png'
import our24 from '../../../public/images/ourWork/24.png'
import our25 from '../../../public/images/ourWork/25.png'
import our26 from '../../../public/images/ourWork/26.png'
import our27 from '../../../public/images/ourWork/27.png'
import our28 from '../../../public/images/ourWork/28.png'
import our29 from '../../../public/images/ourWork/29.png'
import our30 from '../../../public/images/ourWork/30.png'
import our31 from '../../../public/images/ourWork/31.png'
import our32 from '../../../public/images/ourWork/32.png'
import our33 from '../../../public/images/ourWork/33.png'
import our34 from '../../../public/images/ourWork/34.png'
import our35 from '../../../public/images/ourWork/35.png'

const images = [
  our1,
  our2,
  our3,
  our4,
  our5,
  our6,
  our7,
  our8,
  our9,
  our10,
  our11,
  our12,
  our13,
  our14,
  our15,
  our16,
  our17,
  our18,
  our19,
  our20,
  our21,
  our22,
  our23,
  our24,
  our25,
  our26,
  our27,
  our28,
  our29,
  our30,
  our31,
  our32,
  our33,
  our34,
  our35,

]

const WorkCard = () => {
  const [renderedImages, setRenderedImages] = useState(10);

  const handleNext = () => {
    setRenderedImages(renderedImages + 10)
  }
  return (
    <>
      <section className="u-align-center u-clearfix u-section-1" id="sec-ef66">
        <div className="u-clearfix u-sheet u-sheet-1">
          <h1
            className="work-title"
            data-animation-name="customAnimationIn"
            data-animation-duration={1500}
            data-animation-delay={0}
          >
            Our Work
          </h1>
          <div className="mr-[10px]">
            <div className="u-repeater u-repeater-1 my-[20px]!important">
              {images.slice(0, renderedImages).map((imagePath, index) => (
                <div
                  key={index}
                  className="u-align-left u-container-style u-list-item u-repeater-item u-list-item-1"
                  src=""
                  data-animation-name="customAnimationIn"
                  data-animation-duration={1500}
                  data-animation-delay={250 + index * 250}
                >
                  <div className="u-container-layout u-similar-container u-container-layout-1">
                    <img
                      className="u-expanded-width u-image u-image-1 width-main"
                      src={imagePath}
                      data-image-width={988}
                      data-image-height={920}
                      data-animation-name="flipIn"
                      data-animation-duration={1500}
                      data-animation-direction="X"
                      data-animation-delay={750 + index * 250}
                    />
                  </div>
                </div>
              ))}
              {renderedImages < images.length && (
                <div className='mb-6 text-center md:text-left lg:text-center lg:mt-[250px]'>
                  <button className="
                border-[none] rounded-[4px] bg-purple-800 text-[#fff] h-[35px] w-[90px] text-[15px] cursor-pointer [transition:0.5s]  opacity-70 mt-[8px]" onClick={handleNext}>Next</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default WorkCard