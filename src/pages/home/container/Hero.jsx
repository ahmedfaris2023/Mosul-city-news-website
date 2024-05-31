import React from 'react'
import { images } from '../../../constants'
import Search from "../../../components/Search";


const Hero = () => {
return (
    <section className='container mx-auto flex flex-col px-5 py-5 lg:flex-row'>
        <div className='mt-10 lg:w-1/2'>
        <h1  className='font-sans text-3xl text-center font-bold text-dark-soft md:text-xl lg:text-4xl xl:text-5xl lg:text-right lg:max-w-[540px] lg:leading-[3rem] '>مرحبا بكم في موقع اخبار مدينة الموصل </h1>
        <p className="font-sans text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-right">
        موقع خاص باخبار مدينة الموصل ستجدون اخر الاخبار الحصريا وبشفافيه عالية 
        </p>
         <Search className="mt-10 lg:mt-6 xl:mt-10"  />
        <div className='flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7'>
            <span className=' text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl-text-base font-sans'>الكلمات الاكثر بحثا </span>
            <ul className='flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg-text-sm xl-text-base'>
                <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold'>الاعمار </li>
                <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold'>التوسعة</li>
                <li className='rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold'>المستشفيات</li>
            </ul>
        </div>
        </div>

        <div className='hidden lg:block lg:1/2'>
            <img className='mr-11 pr-11 w-full rounded-xl' src={images.Logo} alt="users and reading articles" />
        </div>
    </section>
  )
}

export default Hero