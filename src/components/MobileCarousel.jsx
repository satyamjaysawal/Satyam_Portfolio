// src/components/MobileCarousel.jsx

import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';

const MobileCarousel = () => {
  useEffect(() => {
    const glide09 = new Glide('.glide-09', {
      type: 'carousel',
      autoplay: 3000,
      animationDuration: 1000,
      animationTimingFunc: 'ease-in-out',
      perView: 4,
      breakpoints: {
        1024: {
          perView: 3,
        },
        640: {
          perView: 2,
        },
      },
    });

    glide09.mount();
  }, []);

  return (
    <div className="relative w-full glide-09 py-12 bg-white overflow-hidden shadow-xl rounded-lg">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-black">Trending Mobiles</h2>
      <div data-glide-el="track">
        <ul className="whitespace-no-wrap flex gap-6 p-0 pb-12">
          {[
            { imgSrc: "https://github.com/user-attachments/assets/3b5663f4-813c-4a34-a3d7-a19fd4c62731", title: "Samsung Galaxy S23 Ultra", price: "$1200" },
            { imgSrc: "https://github.com/user-attachments/assets/54eddcd1-2e64-4fa1-be49-7299d1223bed", title: "iPhone 15 Pro Max", price: "$1400" },
            { imgSrc: "https://github.com/user-attachments/assets/1d93e2a7-dcf4-41eb-a007-64abe0c7a693", title: "Google Pixel 8 Pro", price: "$900" },
            { imgSrc: "https://github.com/user-attachments/assets/cd7a46c5-d2d3-4421-983e-479825718359", title: "OnePlus 12", price: "$850" },
            { imgSrc: "https://github.com/user-attachments/assets/0489fdb5-8d97-4764-a9db-f6aa2ed11c65", title: "Xiaomi Mi 13", price: "$700" },
            { imgSrc: "https://github.com/user-attachments/assets/3a8af022-f5bb-45e0-8acf-e318299927ca", title: "Oppo Reno 10", price: "$600" },
            { imgSrc: "https://github.com/user-attachments/assets/4be87990-b717-411d-a59c-00010a314d1b", title: "Realme GT Neo 5", price: "$550" },
            { imgSrc: "https://github.com/user-attachments/assets/81691c6d-00cb-4e9d-ba76-37060d0f0ea8", title: "Vivo X90", price: "$650" },
            { imgSrc: "https://github.com/user-attachments/assets/2a31c2a2-ee7c-4279-b593-37e4fb4732b2", title: "Motorola Edge 40", price: "$750" },
            { imgSrc: "https://github.com/user-attachments/assets/778fed2a-fd05-4d67-823f-522cc390b3e6", title: "Asus ROG Phone 7", price: "$1100" }
          ].map((mobile, index) => (
            <li key={index} className="relative flex flex-col items-center bg-white rounded-xl shadow-lg overflow-hidden w-60 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
              <img src={mobile.imgSrc} alt={mobile.title} className="w-40 h-40 object-contain rounded-md shadow-md mb-4" />
              <div className="text-center p-4">
                <p className="text-xl font-semibold text-gray-800">{mobile.title}</p>
                <span className="text-sm text-gray-500">Price: {mobile.price}</span>
              </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileCarousel;
