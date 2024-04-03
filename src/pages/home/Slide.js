

import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

import '../../assets/slide.scss';



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
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/a3874d5fd0f45c15.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ceb25a1e133b7c45.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/eaee38a18e9813eb.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/e446c82994f3a8fd.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/77fe2b5fc42b091c.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image-71" src={'https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bd94c9e6358f3a70.jpg?q=20'} alt="First slide" />
            </Carousel.Item>
          </Carousel>
        </div>

      </div>



    </>
  );
};

export default Slide;
