import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <>
      <div className="border border-gray-400 rounded-lg bg-white">
        <article className="flex items-center justify-between p-4 lg:p-6">
          <h2
            className="cursor-pointer font-sans text-[18px] "
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {question}
          </h2>
          <ul >
            {!showAnswer && (
              <li>
                <button  onClick={() => setShowAnswer(true)}>
                  <BsPlusLg />
                </button>
              </li>
            )}
            {showAnswer && (
              <li>
                <button onClick={() => setShowAnswer(false)}>
                  <BiMinus />
                </button>
              </li>
            )}
          </ul>
        </article>

        <article
          className={`${showAnswer && "border-t border-gray-400 p-4 lg:p-6 font-sans"}`}
        >
          {showAnswer && <p>{answer}</p>}
        </article>
      </div>
    </>
  );
}