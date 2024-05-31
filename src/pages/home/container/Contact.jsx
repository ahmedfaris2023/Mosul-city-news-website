import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import toast from 'react-hot-toast'

// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_te942qs",
        "template_f5uah7f",
        form.current,
        "q6uZCVOMeJLB9CNp5"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("تم ارسال الرسالة ");
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
   <div className="flex flex-col items-center justify-center p-4 border rounded-lg mt-10">
  <form ref={form} onSubmit={sendEmail} className="w-full max-w-lg">
    <label className="text-cyan-50 font-sans pb-2 block">الاسم</label>
    <input type="text" name="user_name" className="w-full p-2 mb-4 border rounded" />
    <label className="text-cyan-50 font-sans pb-2 block">الحساب</label>
    <input type="email" name="user_email" className="w-full p-2 mb-4 border rounded" />
    <label className="text-cyan-50 font-sans pb-2 block">الرسالة</label>
    <textarea name="message" className="w-full p-2 mb-4 border rounded" ></textarea>
    <input type="submit" className="bg-primary font-sans w-full p-2  rounded cursor-pointer text-white" value="ارسال" />
  </form>
</div>
  );
};

export default Contact;

