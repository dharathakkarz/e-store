
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import '../../assets/slide.scss';
import j1 from '../../assets/images/j1.png'
import j2 from '../../assets/images/j1.png'
import j3 from '../../assets/images/j1.png'
import w3 from '../../assets/images/w3.png'
import m1 from '../../assets/images/m1.jpeg'
import e3 from '../../assets/images/e3.png'
import Card from './Card';

const Slide = () => {
  const [index, setIndex] = useState(0);
  const totalItems = 6; // Total number of carousel items



  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex === (totalItems - 1) ? 0 : prevIndex + 1));
    }, 3000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <>
            <div className='slide-71'>
        <div className="carousel-container-71">
          <Carousel activeIndex={index} interval={3000} controls={false}>
            <Carousel.Item>
              <img className="carousel-image-71" src={j1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={w3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={m1} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={e3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={j2} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={j3} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>

      </div>

      <div>
        {/* <Card/> */}
      </div>
    
    </>
  );
};

export default Slide;
