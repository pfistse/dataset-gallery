import React, { useState } from "react";
import "./Carousel.css";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(items.length < 1 ? 0 : 1);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const getItemClass = (index) => {
    if (index === currentIndex) {
      return "carousel-item center";
    }
    return "carousel-item";
  };

  const getTranslateXValue = () => {
    return `calc(${-(currentIndex - 1) * 33.33}% - 10px)`;
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-button left" onClick={prevSlide}></div>
        <div
          className="carousel-content"
          style={{ transform: `translateX(${getTranslateXValue()})` }}
        >
          {items.map((item, index) => (
            <div className={getItemClass(index)} key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className="carousel-button right" onClick={nextSlide}></div>
      </div>
    </div>
  );
};

export default Carousel;
