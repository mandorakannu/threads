"use client";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Loader from "@ui/Loader";
import React, { useState, useRef } from "react";
import { AlertModel } from "@shared_ui/Model";

function Contact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState<JSX.Element | string>("Send");
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
    isOpen: false,
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      message: messageRef.current?.value,
    };
    const { name, email, message } = data;
    if (!name || !email || !message)
      return setAlertMessage({
        title: "Please fill all the fields",
        description: "",
        isOpen: true,
      });
    const emailValidation = z.string().email();
    try {
      if (!emailValidation.parse(email)) {
        return setAlertMessage({
          title: "Please enter a valid email",
          description: "",
          isOpen: true,
        });
      } else {
        setLoading(<Loader />);
        const res = await axios.post("/api/contact", data);
        if (res.status === 200) {
          setAlertMessage({
            title: "Message sent successfully",
            description: "We will get back to you soon",
            isOpen: true,
          });
        } else {
          setAlertMessage({
            title: "Something went wrong",
            description: "Please try again later",
            isOpen: true,
          });
        }
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        if (err.errors[0].message === "invalid email") {
          return setAlertMessage({
            title: "Please fill all the fields",
            description: "",
            isOpen: true,
          });
        }
        setAlertMessage({
          title: "Please enter a valid email",
          description: "Oops! You missed something.",
          isOpen: true,
        });
      } else {
        setAlertMessage({
          title: "Internal server error",
          description: "Please try again later",
          isOpen: true,
        });
      }
    } finally {
      setLoading("Send");
    }
  };
  return (
    <>
      {alertMessage.isOpen && (
        <AlertModel
          title={alertMessage.title}
          description={alertMessage.description}
          isOpen={alertMessage.isOpen}
          onClose={() => setAlertMessage({ ...alertMessage, isOpen: false })}
        />
      )}
      <div className="container my-16 mx-auto md:px-6 overflow-hidden">
        <section className="mb-32">
          <div className="flex flex-wrap">
            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <h2 className="mb-6 text-3xl font-bold">Contact us</h2>
              <p className="mb-6 text-shade-50 dark:text-shade-50">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about our Business plan? Let us know.
              </p>
              <p className="mb-2 text-shade-50 dark:text-shade-50">
                XYZ, Address
              </p>
              <p className="mb-2 text-shade-50 dark:text-shade-50">
                + 123 456 789
              </p>
              <Link
                href="mailto:mandorakannu.dev@gmail.com"
                className="mb-2 text-shade-50 dark:text-shade-50"
              >
                mandorakannu.dev@gmail.com
              </Link>
            </div>
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6 flex flex-col justify-start gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    className="px-2 py-3 bg-secondary-50 rounded focus:bg-secondary-100 outline-none"
                    type="text"
                    name="name"
                    placeholder="Name"
                    ref={nameRef}
                  />
                </div>
                <div className="mb-6 flex flex-col justify-start gap-2">
                  <label htmlFor="email">Email address</label>
                  <input
                    className="px-2 py-3 bg-secondary-50 rounded focus:bg-secondary-100 outline-none"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    ref={emailRef}
                  />
                </div>
                <div className="mb-6 flex flex-col justify-start gap-2">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="px-2 py-3 bg-secondary-50 rounded focus:bg-secondary-100 outline-none"
                    rows={3}
                    name="message"
                    placeholder="Your message"
                    ref={messageRef}
                  ></textarea>
                </div>
                <div className="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex"></div>
                <button
                  type="submit"
                  className="grid place-items-center mb-6 border w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-300  focus:bg-secondary-300 focus:outline-none focus:ring-0 active:bg-secondary-300 h-10"
                >
                  {loading}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Contact;
