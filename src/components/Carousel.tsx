"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image';

const Carousel = () => {
  const images = ["/banner.png", "/banner2.png", "/banner3.png"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); 
  }, [images.length]);

  const goToSlide = (index:number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto flex flex-col">
  
    <div className="overflow-hidden relative">
 
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          //Я использовала тут img потому что Image не рендерился и 
          //его пропертис не подходят под адаптивную верстку, даже если использовать fill={true}
            <img 
              src={src} key={index}
              alt={`Slide ${index + 1}`}
             className="w-full object-cover"
            />
        ))}
      </div>
    </div>


      <div className="absolute bg-[#9E98DC] right-[-4%] top-[10%] flex flex-col justify-end w-[50px] h-[75px] md:w-[100px] md:h-[140px] lg:w-[140px] lg:h-[200px] p-2">
        <a href="#" className=" font-bold uppercase text-[#1C2A39]-700 no-underline hover:underline text-[6px] md:text-md lg:text-lg">
          Change old book on new
          <Image src="/icons/arrow.svg" alt="Arrow" layout="responsive" width={58} height={34} />
        </a>
      </div>

      <div className="absolute bg-[#FF8FE6] right-[-8%] top-[50%] flex flex-col justify-end p-2 w-[45px] h-[90px] md:w-[90px] md:h-[180px] lg:w-[130px] lg:h-[260px] p-2">
        <a href="#" className="font-bold uppercase text-[#1C2A39]-700 no-underline hover:underline text-[6px] md:text-md lg:text-lg">
          Top 100 books 2022
          <Image src="/icons/arrow.svg" alt="Arrow" layout="responsive" width={58} height={34}/>
        </a>
      </div>

      <div className=" absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-4 md:h-4  rounded-full ${
              index === currentIndex ? "bg-[#9E98DC]" : "bg-[#EFEEF6]"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
