"use client";
import axios from "axios";
import Link from "next/link";
import Loader from "@ui/Loader";
import { AlertModel } from "@shared_ui/Model";
import { apiResponse } from "@functions/response";
import React, { FormEvent, useState } from "react";

export default function Contact() {
  const inputTags = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
    },
    {
      name: "message",
      type: "text",
      placeholder: "Your message",
    },
  ];
  const [loading, setLoading] = useState<JSX.Element | string>("Send");
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    description: "",
    isOpen: false,
  });
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name, email, message } = Object.fromEntries(formData);
    setLoading(<Loader />);
    const res = await axios.post("/api/contact", {
      name,
      email,
      message,
    });
    const data = await apiResponse(res.data.message, res.status);
    setAlertMessage({
      title: data.title,
      description: data.description,
      isOpen: data.isOpen,
    });
    setLoading("Send");
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
                {inputTags.map(({ name, placeholder, type }) => (
                  <div
                    key={name}
                    className="mb-6 flex flex-col justify-start gap-2"
                  >
                    <label htmlFor="name">{name}</label>
                    <input
                      className="px-2 py-3 bg-secondary-50 rounded focus:bg-secondary-100 outline-none"
                      type={type}
                      name={name}
                      placeholder={placeholder}
                      required
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-10 grid place-items-center mb-6 border w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-300  focus:bg-secondary-300 focus:outline-none focus:ring-0 active:bg-secondary-300 h-10"
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
