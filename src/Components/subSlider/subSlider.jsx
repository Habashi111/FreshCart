import React from "react";
import "./SubSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-2.jpeg";
import slider2 from "../../assets/images/slider-image-1.jpeg";
import slider3 from "../../assets/images/slider-2.jpeg";
import slider4 from "../../assets/images/grocery-banner-2.jpeg";
import slider5 from "../../assets/images/slider-image-3.jpeg";

export default function SubSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center max-w-6xl mx-auto px-4 py-6">
      
      <div className="md:col-span-3">
        <Slider {...settings}>
          <img 
            src={slider2} 
            className="w-full h-auto md:h-[400px] object-cover rounded-lg shadow-lg" 
            alt="slider4"
            loading="lazy"
          />
          <img 
            src={slider1} 
            className="w-full h-auto md:h-[400px] object-cover rounded-lg shadow-lg" 
            alt="slider2"
            loading="lazy"
          />
          <img 
            src={slider5} 
            className="w-full h-auto md:h-[400px] object-cover rounded-lg shadow-lg" 
            alt="slider3"
            loading="lazy"
          />
        </Slider>
      </div>

      <div className="md:col-span-1 flex flex-col md:gap-4 gap-2">
        <img 
          src={slider5} 
          className="w-full h-auto md:h-[195px] object-cover rounded-lg shadow-md" 
          alt="slider5"
          loading="lazy"
        />
        <img 
          src={slider1} 
          className="w-full h-auto md:h-[195px] object-cover rounded-lg shadow-md" 
          alt="slider1"
          loading="lazy"
        />
      </div>
    </div>
  );
}
