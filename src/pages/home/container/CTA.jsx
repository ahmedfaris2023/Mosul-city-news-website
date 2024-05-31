import React from "react";
import { images } from "../../../constants";
import Contact from "./Contact";
const CTA = () => {
    return (
        <>
            <svg
                className="w-full h-auto max-h-40 translate-y-[1px]"
                preserveAspectRatio="none"
                viewBox="0 0 2160 263"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    id="Wave"
                     fillRule="evenodd"
                     clipRule="evenodd"
                    d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
                    fill="#0D2436"
                />
            </svg>

            <section className="relative bg-dark-hard px-5">
                <div className="container grid grid-cols-12 mx-auto py-10 md:pd-20 lg:place-items-center">
                    <div className="col-span-12 lg:col-span-6">
                         <h2 className="text-white font-sans font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-right" id="contact">
                            {" "}
                            قم بارسال رسالة عبر البريد الالكتروني
                        </h2>
                        <Contact />
                    </div>
                    <div className="col-span-12 hidden mb-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
                        <div className="w-3/4 mx-auto relative">
                            <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]"/>
                            <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]"/>

                            <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                                <img
                                    src={images.CtaImage}
                                    alt="title"
                                    className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                                />
                                <div className="p-5" >
                                    <h2 className="font-sans font-bold text-xl text-dark-soft md:text-2xl lg:text-[24px] ">
                                        ارسال رسالة عبر البريد الالكتروني
                                    </h2>
                                    <p className="font-sans text-dark-light mt-3 text-sm md:text-lg">
                                     قم بارسال اي استفسار او شكاوى متعلقة باخبار مدينة الموصل وسنحاول الرد باسرع وقت ممكن 
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CTA;
