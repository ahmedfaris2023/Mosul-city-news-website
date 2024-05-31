import React, { useState } from "react";
import { questions } from "./questions";
import SingleQuestion from "./SingleQuestion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
const Feq = () => {
    const [cards] = useState(questions);
  return (
  
    <>
     <Header/>
    <section className="max-w-xl mx-auto py-20 px-4">
        <h1 className="text-center  text-[32px] font-bold mb-8 font-sans">
          الاسئلة الشائعة 
        </h1>

        <section className="grid grid-cols-1 gap-8">
          {cards.map((card, index) => (
            <SingleQuestion {...card} key={index} />
          ))}
        </section>
      </section>
      <Footer />
    </>
  )
}

export default Feq