import React from 'react';
import { images } from '../constants';
import { AiOutlineTwitter, AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { BsTelegram } from 'react-icons/bs';
import MapContainer from './Map';

const Footer = () => {
  return (
     <section className="bg-dark-hard ">
      <footer className="container mx-auto grid grid-cols-10 px-5 py-12 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-5 lg:gap-x-10">
        <div className="col-span-5 md:col-span-4 lg:col-span-2 lg: mr-10">
          <h3 className="text-dark-light font-bold md:text-lg font-sans text-xl">الخدمات </h3>
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4 md:text-base">
            <li>
              <a href="/register" className='font-sans text-lg	'>سجل معنا </a>
            </li>
            <li>
              <a href="/weather" className='font-sans text-lg	'>الطقس</a>
            </li>
            <li>
              <a href="/prayer" className='font-sans text-lg	'>مواقيت الصلاة </a>
            </li>
            <li>
              <a href="/"  className='font-sans text-lg	'>تعليمات التسجيل في الموقع </a>
            </li>
            
          </ul>
        </div>
      
    
        <div >
          <MapContainer />
        </div>
        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          
          <img
            src={images.Logo}
            alt="logo"
            className="mx-auto md:mx-0"
          />
         
          <ul className="flex justify-center items-center mt-5 space-x-5 text-gray-300 md:justify-start lg:justify-center">
            <li className='pl-6'>
              <a href="https://twitter.com/MosulPodcast" >
                <AiOutlineTwitter className=" w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=Z9bw8MGkB-A">
                <AiFillYoutube className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/mosul.insta/?hl=ar">
                <AiFillInstagram className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/Mosul.iraqiaa/">
                <FaFacebook className="w-6 h-auto" />
              </a>
            </li>
            <li>
              <a href="https://telegram.me/s/Mosul_Mosul1">
                <BsTelegram className="w-6 h-auto" />
              </a>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
          
          <p className="font-bold italic text-dark-light">
           . Copyright © 2023 MOSUL
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
