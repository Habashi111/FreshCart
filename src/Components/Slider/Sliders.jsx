import React, { useEffect, useState, useCallback } from "react";
import "./Slider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Sliders() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 5, // Show 5 items per slide
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000, // Smooth transition every 2s
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 async function getCategorySlider()
  {
return await axios
    .get(`https://ecommerce.routemisr.com/api/v1/categories`)
console.log(data.data.data);


  }

  let {data,isError,isLoading,isFetching}=useQuery({
    queryKey:["CategoryName"],
    queryFn:getCategorySlider
  })


  // const [getSlider, setGetSlider] = useState([]);

  // const getCategorySlider = useCallback(() => {
  //   axios
  //     .get(`https://ecommerce.routemisr.com/api/v1/categories`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setGetSlider(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching categories:", err);
  //     });
  // }, []);

  // useEffect(() => {
  //   getCategorySlider();
  // }, [getCategorySlider]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <Slider {...settings}>
        {data?.data?.data.map((category) => (
          <div key={category._id} className="p-2">
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={category.image}
                className="w-full h-[250px] md:h-[200px] object-cover rounded-2xl transition-transform transform hover:scale-110"
                alt={category.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end p-4">
                <h4 className="text-white text-lg font-semibold tracking-wide drop-shadow-md">
                  {category.name}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
